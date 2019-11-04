import React, { useEffect, useState } from 'react';

function Timer() {
  const [time, useTime] = useState(0);
  const [on, setOn] = useState(false);
  let id = null;
  useEffect(() => {
    let val = time;
    id = setInterval(() => {
      val++;
      useTime(val);
    }, 1000);
    return () => {
      clearInterval(id);
    }
  }, [on])

  return (
    <div>
      <div>{time}</div>
      <button onClick={() => { useTime(0); console.log(time); setOn(!on) }}>resultTime</button>
    </div>
  )
}

export default Timer;