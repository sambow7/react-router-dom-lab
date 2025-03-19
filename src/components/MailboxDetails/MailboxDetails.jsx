import { useParams, Link } from 'react-router-dom';

const MailboxDetails = ({ mailboxes, deleteMailbox }) => {
  const { mailboxId } = useParams();
  const selectedBox = mailboxes.find((mailbox) => mailbox.id === Number(mailboxId));

  if (!selectedBox) {
    return <h2>Mailbox Not Found!</h2>;
  }

  return (
    <>
      <h1>Mailbox Details</h1>
      <ul>
        <li><strong>Box ID:</strong> {selectedBox.id}</li>
        <li><strong>Owner:</strong> {selectedBox.sender}</li>
        <li><strong>Subject:</strong> {selectedBox.subject}</li>
        <li><strong>Content:</strong> {selectedBox.content}</li>
      </ul>
      <button onClick={() => deleteMailbox(selectedBox.id)}>Delete Mailbox</button>
      <Link to={`/mailboxes/${selectedBox.id}/edit`}>
        <button>Edit Mailbox</button>
      </Link>
      <Link to="/mailboxes">
        <button>Back to Mailboxes</button>
      </Link>
    </>
  );
};

export default MailboxDetails;