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

type UserType = {
  login: string;
  id: number;
  avatar_url: string;
};

function App() {
  const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
  const [userDetails, setUserDetails] = useState<UserType | null>(null);
  const [users, setUsers] = useState<SearchUserType[]>([]);
  const [tempSearch, setTempSearch] = useState('kama');
  const [searchTerm, setSearchTerm] = useState('kama');

  useEffect(() => {
    console.log('sync_title');
    if (selectedUser) {
      document.title = selectedUser.login;
    }
  }, [selectedUser]);

  useEffect(() => {
    console.log('sync_users');
    axios.get<SearchResult>(`https://api.github.com/search/users?q=${searchTerm}`).then((res) => {
      console.log(res.data);
      setUsers(res.data.items);
    });
  }, [searchTerm]);

  useEffect(() => {
    console.log('sync_users_details');
    if (!!selectedUser) {
      axios.get<UserType>(`https://api.github.com/users/${selectedUser.login}`).then((res) => {
        setUserDetails(res.data);
        console.log(userDetails);
      });
    }
  }, [selectedUser]);

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
            setSearchTerm(tempSearch);
          }}
        >
          find
        </button>
        <ul>
          {users.map((u) => (
            <li
              key={u.id}
              className={selectedUser === u ? 'selected' : ''}
              onClick={() => {
                setSelectedUser(u);
              }}
            >
              {u.login}
            </li>
          ))}
        </ul>{' '}
      </header>
      <div className='info_block'>
        <h2>Username</h2>
        {userDetails && (
          <div className='info_block__descriptions'>
            {userDetails.login}
            <img src={userDetails.avatar_url} alt='avatar' />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
