import React, { useReducer } from 'react';
import { Context, reducer, state } from './stroe';
import Childern from './Children';

function Father() {
  const re = useReducer(reducer, state);
  return (
    <Context.Provider value={re}>
      <Childern />
    </Context.Provider>
  )
}

export default Father;