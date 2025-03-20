import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MailboxForm = ({ addMailbox }) => {
  const [boxOwner, setBoxOwner] = useState("");
  const [boxSize, setBoxSize] = useState("Small");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMailbox = { sender: boxOwner, size: boxSize };

    console.log("New Mailbox Created:", newMailbox); // ✅ Debugging log

    addMailbox(newMailbox); // Send new mailbox data to App.jsx

    navigate("/mailboxes");

    // Clear form fields after submission
    setBoxOwner("");
    setBoxSize("Small");
  };

  return (
    <div>
      <h2>Create a New Mailbox</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="boxOwner">Box Owner:</label>
        <input 
          type="text" 
          id="boxOwner" 
          name="boxOwner" 
          value={boxOwner}
          onChange={(e) => setBoxOwner(e.target.value)}
          required 
        />

        <label htmlFor="boxSize">Box Size:</label>
        <select 
          id="boxSize" 
          name="boxSize"
          value={boxSize}
          onChange={(e) => setBoxSize(e.target.value)}
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>

        <button type="submit">Create Mailbox</button>
      </form>
    </div>
  );
};

export default MailboxForm;