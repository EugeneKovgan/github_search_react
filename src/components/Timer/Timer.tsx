import { useEffect, useState } from 'react';

// type TimeProps = {
//   time: number;
//   onChange: (actualTime: number) => void;
// };

const Timer = () => {
  const [time, setTime] = useState(10);

  useEffect(() => {
    console.log('effect');
    setTimeout(() => {
      console.log('tick');
      setTime(time - 1);
    }, 1000);
  }, [time]);

  return <h3>{time}</h3>;
};

export default Timer;
