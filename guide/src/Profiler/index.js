import React from 'react';

function Profiler() {
  function big() {
    arguments.forEach(ele => {
      console.log(ele)
    });
  }

  function child1() {
    arguments.forEach(ele => {
      console.log(ele)
    });
  }


  return (
    <Profiler id="big" onRender={big}>
      <Profiler id="child1" onRender={child1}>
        <Child1 />
      </Profiler>
      <Child2 />
    </Profiler>
  )
}

function Child1() {

  return (
    <div>
      <div>Child1</div>
    </div>
  )
}

function Child2() {

  return (
    <div>
      <div>Child1</div>
    </div>
  )
}

export default Profiler;