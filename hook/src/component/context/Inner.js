import React, { useContext } from 'react';
import MyContext from './context';

function Inner() {
  const value = useContext(MyContext);
  return (
    <div>
      context value: {value}
    </div>
  )
}

export default Inner;