import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";

import NavBar from "./components/NavBar/NavBar";
import MailboxList from "./components/MailboxList/MailboxList";
import MailboxDetails from "./components/MailboxDetails/MailboxDetails";
import MailboxForm from "./components/MailboxForm/MailboxForm";
import MailboxEdit from "./components/MailboxEdit/MailboxEdit";
import LetterForm from "./components/LetterForm/LetterForm";

const initialState = [
  { id: 1, subject: "Meeting Reminder", sender: "John Doe", content: "Don't forget about our meeting tomorrow at 10 AM" },
  { id: 2, subject: "New Project Proposal", sender: "Jane Smith", content: "We need your expertise to review our proposal" },
  { id: 3, subject: "Payment Reminder", sender: "Mike Johnson", content: "Is this working?" },
];

const App = () => {
  const [mailbox, setMailbox] = useState(initialState);
  const [letters, setLetters] = useState([]); // ✅ New state for letters

  useEffect(() => {
    const storedMailboxes = JSON.parse(localStorage.getItem("mailboxes"));
    if (storedMailboxes) {
      setMailbox(storedMailboxes);
    }
  }, []);

  const updateMailboxStorage = (newMailboxes) => {
    setMailbox(newMailboxes);
    localStorage.setItem("mailboxes", JSON.stringify(newMailboxes));
  };

  const generateUniqueId = () => {
    // Retrieve stored mailboxes from localStorage
    const storedMailboxes = JSON.parse(localStorage.getItem("mailboxes")) || [];
    // Combine stored mailboxes with current state
    const allMailboxes = [...storedMailboxes, ...mailbox];
  
    // Find the highest existing id and increment it
    const newId = allMailboxes.length > 0
      ? Math.max(...allMailboxes.map(box => box.id)) + 1
      : 1;
      // Return the new unique ID
    return newId;
  };


  const addMailbox = (newMailbox) => {
    const newId = generateUniqueId(); // Ensure unique ID assignment
    const updatedMailboxes = [...mailbox, { id: newId, ...newMailbox }];
    updateMailboxStorage(updatedMailboxes);

    setMailbox(updatedMailboxes);
    localStorage.setItem("mailboxes", JSON.stringify(updatedMailboxes));

    console.log("Updated Mailboxes:", updatedMailboxes); // ✅ Debugging log
  };

  const deleteMailbox = (mailboxId) => {
    const updatedMailboxes = mailbox.filter((box) => box.id !== mailboxId);
    updateMailboxStorage(updatedMailboxes); // ✅ Use updateMailboxStorage here
  };

  const editMailbox = (updatedMailbox) => {
    setMailbox(mailbox.map((box) => (box.id === updatedMailbox.id ? updatedMailbox : box)));
  };

  const addLetter = (newLetter) => {
    const updatedLetters = [...letters, newLetter];
    setLetters(updatedLetters);
    localStorage.setItem("letters", JSON.stringify(updatedLetters));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="home-container">
            <Link to="/mailboxes" className="home-button">Enter Post Office</Link>
          </div>
        } />
        <Route path="*" element={
          <>
            <NavBar />
            <Routes>
              <Route path="/mailboxes" element={<MailboxList mailbox={mailbox} />} />
              <Route path="/new-mailbox" element={<MailboxForm addMailbox={addMailbox} />} />
              <Route path="/mailboxes/:mailboxId" element={<MailboxDetails
                mailboxes={mailbox}
                letters={letters}
                deleteMailbox={(id) => {
                  if (window.confirm("Are you sure you want to delete this mailbox?")) {
                    deleteMailbox(id);
                  }
                }}
              />} />
              <Route path="/mailboxes/:mailboxId/edit" element={<MailboxEdit mailboxes={mailbox} editMailbox={editMailbox} />} />
              <Route path="/new-letter" element={<LetterForm mailboxes={mailbox} addLetter={addLetter} />} />
            </Routes>
          </>
        } />
      </Routes>
    </Router>
  );
};

export default App;