import React, { forwardRef } from 'react';

function RefMod(props, ref) {
  return (
    <div>
      <input ref={ref} />
      <input ref={props.inputRef} />
    </div>
  )
}

export default forwardRef(RefMod);