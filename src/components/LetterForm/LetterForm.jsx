import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LetterForm = ({ mailboxes, addLetter }) => {
  const navigate = useNavigate();
  const [mailboxId, setMailboxId] = useState(mailboxes.length ? mailboxes[0].id : "");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recipient || !message) return;
    
    addLetter({ mailboxId: Number(mailboxId), recipient, message });
    navigate(`/mailboxes/${mailboxId}`); // Redirect to the mailbox details page
  };

  return (
    <div className="mailbox-edit">
      <h2>Send a New Letter</h2>
      <form onSubmit={handleSubmit}>
        <label>Select Mailbox:</label>
        <select value={mailboxId} onChange={(e) => setMailboxId(e.target.value)}>
          {mailboxes.map((box) => (
            <option key={box.id} value={box.id}>
              Mailbox {box.id} - {box.sender}
            </option>
          ))}
        </select>

        <label>Recipient:</label>
        <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />

        <label>Message:</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required />

        <button type="submit">Send Letter</button>
      </form>
    </div>
  );
};

export default LetterForm;