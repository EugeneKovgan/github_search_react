import React, { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

type SearchUserType = {
  login: string;
  id: number;
};

type SearchResult = {
  items: SearchUserType[];
};

function App() {
  const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
  const [users, setUsers] = useState<SearchUserType[]>([]);
  const [tempSearch, setTempSearch] = useState('');

  useEffect(() => {
    console.log('sync_title');
    if (selectedUser) {
      document.title = selectedUser.login;
    }
  }, [selectedUser]);

  const fetchData = (term: string) => {
    axios.get<SearchResult>(`https://api.github.com/search/users?q=${term}`).then((res) => {
      console.log(res.data);
      setUsers(res.data.items);
    });
  };

  useEffect(() => {
    console.log('sync_users');
    fetchData('kama');
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <input
          placeholder='search'
          type='text'
          value={tempSearch}
          onChange={(e) => {
            setTempSearch(e.currentTarget.value);
          }}
        />
        <button
          onClick={() => {
            fetchData(tempSearch);
          }}
        >
          find
        </button>
      </header>
      <ul>
        {users.map((u) => (
          <li
            key={u.id}
            className={selectedUser === u ? 'selected' : ''}
            onClick={() => {
              // document.title = u;
              setSelectedUser(u);
            }}
          >
            {u.login}
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
