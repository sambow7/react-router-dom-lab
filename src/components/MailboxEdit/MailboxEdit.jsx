import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const MailboxEdit = ({ mailboxes, editMailbox }) => {
  const { mailboxId } = useParams();
  const navigate = useNavigate();
  const selectedBox = mailboxes.find((mailbox) => mailbox.id === Number(mailboxId));

  const [boxOwner, setBoxOwner] = useState(selectedBox?.sender || "");
  const [boxSize, setBoxSize] = useState(selectedBox?.size || "Small");

  if (!selectedBox) {
    return <h2>Mailbox Not Found!</h2>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    editMailbox({ id: selectedBox.id, sender: boxOwner, size: boxSize });
    navigate("/mailboxes"); // Redirect back to the mailbox list
  };

  return (
    <div className="mailbox-edit">
      <h2>Edit Mailbox</h2>
      <form onSubmit={handleSubmit}>
        <label>Box Owner:</label>
        <input type="text" value={boxOwner} onChange={(e) => setBoxOwner(e.target.value)} required />

        <label>Box Size:</label>
        <select value={boxSize} onChange={(e) => setBoxSize(e.target.value)}>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default MailboxEdit;