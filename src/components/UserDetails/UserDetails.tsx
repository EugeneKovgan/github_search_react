import axios from 'axios';
import { useEffect, useState } from 'react';
import { UserDetailsPropsType, UserType } from '../../App';
import Timer from '../Timer/Timer';

const UserDetails = (props: UserDetailsPropsType) => {
  let setTimeValue = 10;
  const [userDetails, setUserDetails] = useState<UserType | null>(null);
  const [time, setTime] = useState(setTimeValue);

  useEffect(() => {
    console.log('sync_users_details');
    if (!!props.user) {
      axios.get<UserType>(`https://api.github.com/users/${props.user.login}`).then((res) => {
        setTime(setTimeValue);
        setUserDetails(res.data);
      });
    }
  }, [props.user]);

  useEffect(() => {
    if (time < 1) {
      setUserDetails(null);
    }
  }, [time]);

  return (
    <div className='info_block'>
      {userDetails && (
        <div className='info_block__descriptions'>
          <h2>{userDetails.login}</h2>
          <Timer time={time} onChange={setTime} userId={userDetails.id} />
          <img src={userDetails.avatar_url} alt='avatar' />
          {userDetails.login}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
