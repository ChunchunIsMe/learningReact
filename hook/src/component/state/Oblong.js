import React, { useState } from 'react';

function Oblong() {
  const [attr, useAttr] = useState({ width: 100, height: 100 })
  return (
    <div>
      <div style={{ backgroundColor: 'red', ...attr }}></div>
      <button
        onClick={() => {
          useAttr({ ...attr, width: attr.width + 10 })
        }}
      >add width</button>
      <button
        onClick={() => {
          useAttr({ ...attr, height: attr.height + 10 })
        }}
      >add height</button>
    </div>
  )
}

export default Oblong;