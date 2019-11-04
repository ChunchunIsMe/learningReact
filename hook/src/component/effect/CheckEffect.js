import React, { useState, useEffect } from 'react';

function CheckEffect() {
  const [val, setVal] = useState(0);
  const [count, setCount] = useState(0);
  const [obj, setObj] = useState({ time: 0, zzz: 0 });
  let num = 0;

  useEffect(() => {
    console.log('nothing')
    return () => {
      console.log('nothing return')
    }
  })

  useEffect(() => {
    console.log('[]')
    return () => {
      console.log('[] return')
    }
  }, [])

  useEffect(() => {
    console.log('[val]')
    return () => {
      console.log('[val] return')
    }
  }, [val])

  useEffect(() => {
    console.log('[num]')
    return () => {
      console.log('[num] return')
    }
  }, [num])

  useEffect(() => {
    console.log('[obj]')
    return () => {
      console.log('[obj] return')
    }
  }, [obj])

  useEffect(() => {
    console.log('[obj.time]')
    return () => {
      console.log('[obj.time] return')
    }
  }, [obj.time])

  useEffect(() => {
    console.log('[obj.zzz]')
    return () => {
      console.log('[obj.zzz] return')
    }
  }, [obj.zzz])

  useEffect(() => {
    console.log('[val, count]')
    return () => {
      console.log('[val, count] return')
    }
  }, [val, count])

  return (
    <div>
      <button onClick={() => setVal(val + 1)}>addVal</button>
      <button onClick={() => setCount(count + 1)}>addCoung</button>
      <button onClick={() => num++}>addNum</button>
      <button onClick={() => { obj.time++; setObj(obj) }}>addObjTime</button>
      <button onClick={() => { setObj({ ...obj, time: obj.time + 1 }) }}>addObjTimeChange</button>
    </div>
  )

}

export default CheckEffect;