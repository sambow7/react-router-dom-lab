const MailboxList = (props) => {
  return (
    <>
    <h1>Mailbox List</h1>
    <ul>
      {props.mailbox.map((currentMailbox) => (
        <li key={currentMailbox.name}>{currentMailbox.name}</li>
      ))}
    </ul>
    </>
  )
};


export default MailboxList;