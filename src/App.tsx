import { useState } from 'react';
import './App.css';
import ChatScreen from './components/ChatScreen';
import JoinScreen from './components/JoinScreen';

function App() {
  const [userName, setUsername] = useState('');

  return (
    <>
      {!userName && <JoinScreen onJoin={(name) => setUsername(name)} />}
      {userName && <ChatScreen joinedUserName={userName} />}
    </>
  );
}

export default App;
