import { useEffect, useState } from 'react';
import ChatBox from './ChatBox';
import Messages from './Messages';
import type { Message } from '../types/message';

type ChatScreenProps = {
  joinedUserName: string;
};

function ChatScreen(props: ChatScreenProps) {
  const { joinedUserName } = props;
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<WebSocket>();

  const wsUri = 'ws://localhost:8000/message';

  useEffect(() => {
    const websocket = new WebSocket(wsUri);
    if (joinedUserName) {
      // establish the websocket connection

      websocket.addEventListener('open', () => {
        console.log('Connected');
      });

      websocket.addEventListener('error', (e) => {
        console.log(e);
      });

      websocket.addEventListener('message', (e) => {
        const message_received = e.data;

        const message_json: Message = JSON.parse(message_received);
        console.log(message_json);

        setMessages((prev) => [
          ...prev,
          {
            username: message_json.username,
            timestamp: message_json.timestamp,
            message: message_json.message,
          },
        ]);
      });

      setSocket(websocket);
    }

    return () => {
      websocket.close();
    };
  }, [joinedUserName]);

  const sendMessage = async (message: string) => {
    try {
      if (socket) {
        socket.send(
          JSON.stringify({
            username: joinedUserName,
            message: message,
          }),
        );
        setMessages((prev) => [
          ...prev,
          {
            message: message,
            username: joinedUserName,
            timestamp: new Date().toISOString(),
          },
        ]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="container">
        {/* messages section */}
        <Messages messages={messages} />
        {/* input box */}
        <ChatBox onSendMessage={sendMessage} />
      </div>
    </>
  );
}

export default ChatScreen;
