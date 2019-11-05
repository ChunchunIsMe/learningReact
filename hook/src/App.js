import React, { Component } from 'react';
import Count from './component/state/Count';
import CountClass from './component/state/CountClass';
import Oblong from './component/state/Oblong';
import Timer from './component/effect/Timer';
import HookCustom from './component/custom/HookCustom';
import Search from './component/custom/Search';
import ShowSearch from './component/custom/ShowSearch';
import CheckEffect from './component/effect/CheckEffect';
import Outer from './component/context/Outer';
import NumCount from './component/reducer/NumCount';
import Father from './component/memoAndCallback/Father';
import RefClass from './component/ref/RefClass';
import RefFun from './component/ref/RefFun';
import Deom from './component/imperativeHandle/Demo'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true
    }
  }
  render() {
    const { show } = this.state;
    return (
      <div style={{ textAlign: 'center' }}>
        <Count />
        <CountClass />
        <Oblong />
        <CheckEffect />
        {show && <Timer />}
        <button onClick={() => { this.setState(({ show }) => ({ show: !show })) }}>切换</button>
        <HookCustom />
        <Search />
        <ShowSearch />
        <Outer />
        <NumCount num={0} />
        <NumCount num={10} />
        <Father />
        <RefClass />
        <RefFun />
        <Deom />
      </div>
    );
  }
}

export default App;
