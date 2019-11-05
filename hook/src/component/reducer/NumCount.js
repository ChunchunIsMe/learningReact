import React, { useReducer } from 'react';

function init(num) {
  const result = Number(num);
  if (Number.isNaN(result)) {
    throw new Error('not a number');
  }
  return result;
}


function NumCount({ num }) {
  function reducer(state, action) {
    switch (action.type) {
      case 'add':
        return state + 1;
      case 'minus':
        return state - 1;
      case 'reset':
        return num;
      default:
        throw new Error('error');
    }
  }

  const [state, dispatch] = useReducer(reducer, num, init);

  return (
    <div>
      <div>count: {state}</div>
      <div>
        <button onClick={() => dispatch({ type: 'add' })}>add count</button>
        <button onClick={() => dispatch({ type: 'minus' })}>minus count</button>
        <button onClick={() => dispatch({ type: 'reset' })}>reset count</button>
      </div>
    </div>
  )
}

export default NumCount;