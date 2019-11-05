import React, { useContext, useCallback, useMemo } from 'react';
import { Context } from './stroe';

function Children() {
  return (
    <div>
      <Left />
      <Right />
    </div>
  )
}

function Left() {
  const [value, dispatch] = useContext(Context);
  console.log('left');
  return useMemo(() => (
    <div
      style={{
        display: 'inline-block',
        width: '100px',
        height: '100px',
        backgroundColor: value.left,
        marginRight: '10px'
      }}
      onClick={() => dispatch({ type: 'right' })}
    >
      点击我改变右边的颜色
    </div>
  ), [value.left])
}

const funSet = new Set();
const domSet = new Set();

function Right() {
  const [value, dispatch] = useContext(Context);
  console.log('right');
  const click = useCallback(() => dispatch({ type: 'left' }), [])

  const dom = useMemo(() => (
    <div
      style={{
        display: 'inline-block',
        width: '100px',
        height: '100px',
        backgroundColor: value.right,
      }}
      onClick={click}
    >
      点击我改变左边的颜色
    </div>
  ), [value.right])
  funSet.add(click);
  domSet.add(dom);
  console.log(funSet);
  console.log(domSet);
  return dom;
}

export default Children;