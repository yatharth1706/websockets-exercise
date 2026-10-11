import { useState } from 'react';

type ChatboxProps = {
  onSendMessage: (message: string) => void;
};

function ChatBox(props: ChatboxProps) {
  const { onSendMessage } = props;
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    console.log(message);
    console.log('button clicked');
    if (message && message.trim()) {
      console.log('message sent');
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="row">
      <input
        className="input"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="button primary" onClick={handleSendMessage}>
        Send
      </button>
    </div>
  );
}

export default ChatBox;
