import React, { Component } from 'react';

class FormItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      select: '1'
    }
  }

  inputChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }
  selectChange = (e) => {
    this.setState({
      select: e.target.value
    })
  }
  render() {
    const { input, select } = this.state;
    const optionList = [
      {
        id: '1',
        text: '橘子'
      }, {
        id: '2',
        text: '橙子'
      }, {
        id: '3',
        text: '柚子'
      }
    ]
    return (
      <form>
        <input value={input} onChange={this.inputChange} />
        <select value={select} onChange={this.selectChange}>
          {
            optionList.map(item => (
              <option value={item.id} key={item.id}>{item.text}</option>
            ))
          }
        </select>
      </form>
    )
  }
}

export default FormItem;