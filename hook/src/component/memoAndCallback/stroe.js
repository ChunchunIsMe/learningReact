import { createContext } from 'react';

const state = {
  left: 'red',
  right: 'green'
}

const Context = createContext(null)

function reducer(state, action) {
  let obj = {}
  switch (action.type) {
    case 'left':
      obj = {
        ...state,
        left: state.left === 'red' ? 'yellow' : 'red'
      }
      break;
    case 'right':
      obj = {
        ...state,
        right: state.right === 'green' ? 'blue' : 'green'
      }
      break;
  }
  return obj;
}



export {
  Context,
  reducer,
  state
}