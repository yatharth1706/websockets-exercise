import { useState } from 'react';

type JoinScreenProps = {
  onJoin: (userName: string) => void;
};

function JoinScreen(props: JoinScreenProps) {
  const { onJoin } = props;
  const [userName, setUserName] = useState('');

  const handleJoin = () => {
    if (userName && userName.trim()) {
      onJoin(userName);
    }
  };

  return (
    <div className="container">
      <h1>Join the chat</h1>
      <div className="row">
        <input
          className="input"
          type="text"
          value={userName}
          placeholder="Enter your name"
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={handleJoin} className="button primary">
          Join
        </button>
      </div>
    </div>
  );
}

export default JoinScreen;
