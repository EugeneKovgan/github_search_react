import axios from 'axios';
import { useEffect, useState } from 'react';
import { SearchResult, SearchUserType, UserListType } from '../../App';

const UsersList = (props: UserListType) => {
  const [users, setUsers] = useState<SearchUserType[]>([]);

  useEffect(() => {
    console.log('sync_users');
    axios.get<SearchResult>(`https://api.github.com/search/users?q=${props.term}`).then((res) => {
      console.log(res.data);
      setUsers(res.data.items);
    });
  }, [props.term]);

  return (
    <ul>
      {users.map((u) => (
        <li
          key={u.id}
          className={props.selectedUser === u ? 'selected' : ''}
          onClick={() => {
            props.onUserSelect(u);
          }}
        >
          {u.login}
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
