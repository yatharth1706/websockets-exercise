import type { Message } from '../types/message';

type MessagesProps = {
  messages: Message[];
};

function Messages(props: MessagesProps) {
  const { messages } = props;

  return (
    <div className="container">
      <h1>All shared messages</h1>

      {messages.map((message: Message) => (
        <div className="row">
          <span>{message.username} . </span>
          <span>{message.message} . </span>
          <span>{message.timestamp}</span>
        </div>
      ))}
    </div>
  );
}

export default Messages;
