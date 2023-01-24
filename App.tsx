import { useState } from 'react';
import './App.css';

function App() {
  const [selectedUser, setSelectedUser] = useState();

  return (
    <div className='App'>
      <header className='App-header'>
        <input placeholder='search' type='text' />
        <button>find</button>
      </header>
      <ul>
        {['Dima', 'Eugene'].map((u) => (
          <li
            onClick={() => {
              console.log('click');
              document.title = u;
            }}
          >
            {u}
          </li>
        ))}
      </ul>
      <div>
        <h2>Username</h2>
        <div>details</div>
      </div>
    </div>
  );
}

export default App;
