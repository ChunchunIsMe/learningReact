import React, { Component } from 'react';

class RefClass extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  render() {
    return (
      <div>
        <input ref={this.myRef} />
        <button onClick={() => console.log(this.myRef.current)}>see ref</button>
        <CustomTextInput inputRef={(e) => { this.input = e }} />
        <button onClick={() => console.log(this.input.value)}>see ref</button>
      </div>
    )
  }
}

function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  )
}

export default RefClass;