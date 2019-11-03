import React, { useEffect, useState } from 'react';

function Timer() {
  const [time, useTime] = useState(0);
  const [count, useCount] = useState(0);

  useEffect(() => {
    console.log('change1')
    return () => {
      console.log('directory1')
    }
  })

  useEffect(() => {
    console.log('change2')
    return () => {
      console.log('directory2')
    }
  }, [])

  useEffect(() => {
    console.log('change3')
    return () => {
      console.log('directory3')
    }
  }, [time])

  useEffect(() => {
    console.log('change4')
    return () => {
      console.log('directory4')
    }
  }, [count])

  useEffect(() => {
    console.log('change5')
    return () => {
      console.log('directory5')
    }
  }, [time, count])

  return (
    <div>
      <button onClick={() => useTime(time + 1)}>add time</button>
      <button onClick={() => useCount(count + 1)}>add count</button>
    </div>
  )
}

export default Timer;