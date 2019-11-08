import React, { PureComponent } from 'react'

class ClassRef extends PureComponent {

  afunc() {
    console.log('hi')
  }

  bfunc = () => {
    console.log(this.props.ref)
  }

  render() {
    return (
      <div>
        <input ref={this.props.inputRef} />
        <input ref={this.props.inputRef2} />
        <button onClick={this.bfunc}>run bfunc</button>
      </div>
    )
  }
}

export default ClassRef;
