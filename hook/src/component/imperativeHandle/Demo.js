import React, { useImperativeHandle, useState, forwardRef, useRef } from 'react';

function Demo() {
  let children = useRef();
  return (
    <div>
      <Child ref={children} />
      <button onClick={() => children.current.setState(children.current.state + 1)}>Father add count</button>
    </div>
  )
}

function Com(props, ref) {
  const [state, setState] = useState(0);
  useImperativeHandle(ref, () => ({
    state,
    setState
  }), [state])
  return (
    <div>
      <div>{state}</div>
      <button onClick={() => setState(state + 1)}>Child add count</button>
    </div>
  )
}

const Child = forwardRef(Com);


export default Demo;