import React, { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import Search from './components/Header/Header';
import UsersList from './components/UsersList/UsersList';
import UserDetails from './components/UserDetails/UserDetails';

export type SearchUserType = {
  login: string;
  id: number;
};

export type SearchResult = {
  items: SearchUserType[];
};

export type UserType = {
  login: string;
  id: number;
  avatar_url: string;
};

export type SearchPropsType = {
  value: string;
  onSubmit: (fixedValue: string) => void;
};

export type UserListType = {
  term: string;
  selectedUser: SearchUserType | null;
  onUserSelect: (user: SearchUserType) => void;
};

export type UserDetailsPropsType = { user: SearchUserType | null };

function App() {
  let initialSearch = 'kama';
  const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null);
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  useEffect(() => {
    console.log('sync_title');
    if (selectedUser) {
      document.title = selectedUser.login;
    }
  }, [selectedUser]);

  return (
    <div className='App'>
      <Search value={searchTerm} onSubmit={(value) => setSearchTerm(value)} />
      <button
        onClick={() => {
          setSearchTerm(initialSearch);
        }}
      >
        reset
      </button>

      <div className='content'>
        <UsersList term={searchTerm} selectedUser={selectedUser} onUserSelect={setSelectedUser} />

        <UserDetails user={selectedUser} />
      </div>
    </div>
  );
}

export default App;
