import { Link } from 'react-router-dom';

const MailboxList = ({ mailbox }) => {
  return (
    <div>
      <h1>Mailbox List</h1>
      <ul>
        {mailbox.map((box) => (
          <li key={box.id}>
            <Link to={`/mailboxes/${box.id}`}>
              <strong>Box ID:</strong> {box.id} - <strong>Owner:</strong> {box.sender}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MailboxList;