import './responseModal.css';

export default function ResponseModal({messages}) {
    console.log(messages)
    return (
      <div className="responseModal">
        <h2 className="responseModal_title">Information</h2>
        <hr className="responseModal_separator" />
        {messages.map((message) => <p key={message} className="responseModal_messages">{message}</p>)}
      </div>
    );
}