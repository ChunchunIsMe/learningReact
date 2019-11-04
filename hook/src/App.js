import React, { Component } from 'react';
import Count from './component/Count';
import CountClass from './component/CountClass';
import Oblong from './component/Oblong';
import Timer from './component/Timer';
import HookCustom from './component/HookCustom';
import Search from './component/Search';
import ShowSearch from './component/ShowSearch';

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
        {show && <Timer />}
        <button onClick={() => { this.setState(({ show }) => ({ show: !show })) }}>切换</button>
        <HookCustom />
        <Search />
        <ShowSearch />
      </div>
    );
  }
}

export default App;
