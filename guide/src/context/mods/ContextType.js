import React,{PureComponent} from 'react';
import MyContext from '../context';

class ContextType extends PureComponent {

  render() {
    return (
      <div>ContextType Count: {this.context}</div>
    )
  }
}
ContextType.contextType = MyContext

export default ContextType;