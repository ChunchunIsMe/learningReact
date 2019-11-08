import React from 'react';
import MyContext from '../context';

function Consumer() {
  return (
    <MyContext.Consumer>
      {
        value => (
          <div>Consumer Count: {value}</div>
        )
      }
    </MyContext.Consumer>
  )
}

export default Consumer;