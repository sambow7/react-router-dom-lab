const MailboxForm = () => {
  return (
    <div>
      <h2>Create a New Mailbox</h2>
      <form>
        <label htmlFor="boxOwner">Box Owner:</label>
        <input type="text" id="boxOwner" name="boxOwner" required />

        <label htmlFor="boxSize">Box Size:</label>
        <select id="boxSize" name="boxSize">
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>

        <button type="submit">Create Mailbox</button>
      </form>
    </div>
  );
};

export default MailboxForm; // ✅ This is the missing export!