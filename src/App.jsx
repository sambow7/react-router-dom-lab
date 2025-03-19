// src/App.jsx

import { useState } from 'react';
import MailboxList from "./components/MailboxList/MailboxList";
import NavBar from "./components/NavBar/NavBar";

const initialState = [
  { id: 1, subject: 'Meeting Reminder', sender: 'John Doe', content: 'Don\'t forget about our meeting tomorrow at 10 AM' },
  { id: 2, subject: 'New Project Proposal', sender: 'Jane Smith', content: 'We need your expertise to review our proposal' },
  { id: 3, subject: 'Payment Reminder', sender: 'Mike Johnson', content: 'is this Working?' },
];
const App = () => {
  const [mailbox, setMailbox] = useState(initialState);

  return (
    <>
    <NavBar />
    <h1>Mailbox</h1>
    <MailboxList mailbox={mailbox} />
    </>
  );
  
};

export default App;
