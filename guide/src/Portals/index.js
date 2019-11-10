import React from 'react'
import ReactDOM, { createPortal } from 'react-dom';

function Portals() {
  return (
    <div>
      <button>123</button>
      <Child />
    </div>
  )
}

function Child() {
  return createPortal(
    <div>portal</div>,
    document.getElementById('root')
  )
}


export default Portals;