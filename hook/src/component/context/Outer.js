import React, { useState } from 'react';
import Inner from './Inner';
import MyContext from './context';

function Outer() {
  const [val, setVal] = useState(0)
  return (
    <MyContext.Provider value={val}>
      <Inner />
      <button onClick={() => setVal(val + 1)}>add val</button>
    </MyContext.Provider>
  )
}

export default Outer;