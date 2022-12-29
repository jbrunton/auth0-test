import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { AuthWidget } from './components/auth/AuthWidget'
import { useGreeting } from './data/greetings'
import { MessagesWidget } from './components/messages/MessagesWidget'
import { useMessages } from './data/messages'


function App() {
  const [roomId, setRoomId] = useState("101");
  
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <input placeholder='room ID' value={roomId} onChange={(e) => setRoomId(e.target.value)} />
        <MessagesWidget roomId={roomId} />
      </div>
      <div>
        <AuthWidget />
      </div>      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
