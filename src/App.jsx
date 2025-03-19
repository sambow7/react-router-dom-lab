// src/App.jsx

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import MailboxList from './components/MailboxList/MailboxList';
import MailboxDetails from './components/MailboxDetails/MailboxDetails';
import MailboxForm from './components/MailboxForm/MailboxForm';

const initialState = [
  { id: 1, subject: 'Meeting Reminder', sender: 'John Doe', content: 'Don\'t forget about our meeting tomorrow at 10 AM' },
  { id: 2, subject: 'New Project Proposal', sender: 'Jane Smith', content: 'We need your expertise to review our proposal' },
  { id: 3, subject: 'Payment Reminder', sender: 'Mike Johnson', content: 'Is this working?' },
];

const App = () => {
  const [mailbox, setMailbox] = useState(initialState);
  const addMailbox = (newMailbox) => {
    setMailbox([...mailbox, { 
      id: mailbox.length + 1, // Assigns a new unique ID
      ...newMailbox 
    }]);
  };
  const deleteMailbox = (mailboxId) => {
    setMailbox(mailbox.filter((box) => box.id !== mailboxId));
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Post Office</h1>} />
        <Route path="/mailboxes" element={<MailboxList mailbox={mailbox} />} />
        <Route path="/new-mailbox" element={<MailboxForm addMailbox={addMailbox} />} />
        <Route path="/mailboxes/:mailboxId" element={<MailboxDetails mailboxes={mailbox} />} />
        <Route path="/mailboxes/:mailboxId" element={<MailboxDetails mailboxes={mailbox} deleteMailbox={deleteMailbox} />} />
        <Route path="/mailboxes/:mailboxId/edit" element={() => <h2>Edit Mailbox</h2>} /> 

      </Routes>
    </Router>
  );
};

export default App;