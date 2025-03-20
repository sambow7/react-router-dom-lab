// src/App.jsx

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  
  const addMailbox = (newMailbox) => {
    const newMailboxes = [...mailbox, { id: mailbox.length + 1, ...newMailbox }];
    updateMailboxStorage(newMailboxes);
  };
  
  const deleteMailbox = (mailboxId) => {
    const newMailboxes = mailbox.filter((box) => box.id !== mailboxId);
    updateMailboxStorage(newMailboxes);
  };

  const editMailbox = (updatedMailbox) => {
    setMailbox(mailbox.map((box) => (box.id === updatedMailbox.id ? updatedMailbox : box)));
  };

  const addLetter = (newLetter) => {
    setLetters([...letters, newLetter]);
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Post Office</h1>} />
        <Route path="/mailboxes" element={<MailboxList mailbox={mailbox} />} />
        <Route path="/new-mailbox" element={<MailboxForm addMailbox={addMailbox} />} />
        <Route path="/mailboxes/:mailboxId" element={<MailboxDetails mailboxes={mailbox} letters={letters} deleteMailbox={deleteMailbox} />} />
        <Route path="/mailboxes/:mailboxId/edit" element={<MailboxEdit mailboxes={mailbox} editMailbox={editMailbox} />} />
        <Route path="/new-letter" element={<LetterForm mailboxes={mailbox} addLetter={addLetter} />} />
      </Routes>
    </Router>
  );
};

export default App;