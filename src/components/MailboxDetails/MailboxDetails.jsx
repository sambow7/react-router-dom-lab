import { useParams, Link } from "react-router-dom";


const MailboxDetails = ({ mailboxes, letters, deleteMailbox }) => {
  const { mailboxId } = useParams();

  if (!mailboxes || !mailboxes.length) {
    return <h2>Loading mailboxes...</h2>;
  }

  const selectedBox = mailboxes.find((mailbox) => mailbox.id === Number(mailboxId));
  console.log("Mailbox Details Props - Letters:", letters);
  const selectedLetters = letters?.filter(letter => Number(letter.mailboxId) === Number(mailboxId)) || [];
  console.log("Filtered Letters:", selectedLetters);

  if (!selectedBox) {
    return <h2>Mailbox Not Found!</h2>;
  }

  return (
    <>
      <h1>Mailbox Details</h1>
      <ul>
        <li><strong>Box ID:</strong> {selectedBox.id}</li>
        <li><strong>Owner:</strong> {selectedBox.sender}</li>
      </ul>

      <h2>Letters</h2>
      {selectedLetters.length > 0 ? (
        <ul className="letter-list">
          {selectedLetters.map((letter, index) => (
            <li key={index} className="letter-card">
              <p><span className="neon-label">To:</span> {letter.recipient}</p>
              <p><span className="neon-label">Message:</span> {letter.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="letter-list">No letters yet.</p>
      )}

      <button
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this mailbox?")) {
            deleteMailbox(selectedBox.id);
          }
        }}
      >
        Delete Mailbox
      </button>
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