import React, { PureComponent } from 'react';
import RefMod from './mods/RefMod';
import ClassRef from './mods/ClassRef';

class Ref extends PureComponent {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.refModInput = React.createRef();
    this.refModInput1 = React.createRef();


    this.classInput = React.createRef();
    this.classRefDom = React.createRef();
  }

  run = () => {
    this.classRefDom.current.afunc();
  }

  getRef1 = () => {
    console.dir(this.text.value)
  }

  getRef2 = () => {
    console.dir(this.text2.value)
  }

  render() {
    return (
      <div>
        {/* 基本用法 */}
        <div>input value: {(this.textInput.current || { value: '' }).value}</div>
        <input ref={this.textInput} />
        <input ref={(e) => { this.text = e; }} />
        <div>
          <button onClick={() => console.log(this.textInput.current.value)}>get ref</button>
          <button onClick={this.getRef1}>get ref2</button>
        </div>
        {/* function 操作 */}
        <RefMod ref={this.refModInput} inputRef={this.refModInput1} />
        <button onClick={() => console.log(this.refModInput.current.value)}>getMod ref</button>
        <button onClick={() => console.log(this.refModInput1.current.value)}>getMod1 ref</button>
        {/* class 操作 */}
        <ClassRef ref={this.classRefDom} inputRef={this.classInput} inputRef2={e => { this.text2 = e }} />
        <button onClick={this.run}>run classRef afunc</button>
        <button onClick={() => console.log(this.classRefDom.current.value)}>get class val</button>
        <button onClick={this.getRef2}>get class val2</button>

      </div>
    )
  }
}

export default Ref;