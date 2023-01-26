import axios from 'axios';
import { useEffect, useState } from 'react';
import { UserDetailsPropsType, UserType } from '../../App';
import Timer from '../Timer/Timer';

const UserDetails = (props: UserDetailsPropsType) => {
  const [userDetails, setUserDetails] = useState<UserType | null>(null);

  useEffect(() => {
    console.log('sync_users_details');
    if (!!props.user) {
      axios.get<UserType>(`https://api.github.com/users/${props.user.login}`).then((res) => {
        setUserDetails(res.data);
      });
    }
  }, [props.user]);

  return (
    <div className='info_block'>
      {userDetails && (
        <div className='info_block__descriptions'>
          <h2>{userDetails.login}</h2>
          <Timer />
          <img src={userDetails.avatar_url} alt='avatar' />
          {userDetails.login}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
