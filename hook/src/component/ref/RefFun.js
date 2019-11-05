import React, { useRef } from 'react';

function RefFun() {
  const myRef = useRef();
  let input = null;
  return (
    <div>
      <input ref={myRef} />
      <button onClick={() => console.log(myRef.current)}>see ref</button>
      <CustomTextInput inputRef={(e) => { input = e }} />
      <button onClick={() => console.log(input.value)}>see ref</button>
    </div>
  )
}

function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  )
}

export default RefFun;