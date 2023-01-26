import { useEffect, useState } from 'react';

type TimeProps = {
  time: number;
  onChange: (actualTime: number) => void;
  userId: number;
};

const Timer = (props: TimeProps) => {
  const [time, setTime] = useState(props.time);

  useEffect(() => {
    setTime(props.time);
  }, [props.time]);

  useEffect(() => {
    props.onChange(time);
  }, [time]);

  useEffect(() => {
    const idInterval = setInterval(() => {
      console.log('tick');
      setTime((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(idInterval); //without clearInterval counter works twice WTF?
    };
  }, [props.userId]);

  return <h3>{time}</h3>;
};

export default Timer;
