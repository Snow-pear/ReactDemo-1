import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';
import Test from './Test';
import './style.css';

export default class TodoList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            list: [],
        };
        this.onChange = this.onChange.bind(this);
        this.addList = this.addList.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    onChange(e) {
      const value = e.target.value;
      this.setState(() =>({
        inputValue: value
      }));
    }

    addList() {
      this.setState((prevState) => ({
        list: [...prevState.list,prevState.inputValue],
        inputValue: '',
      }));
    }

    getTodoItem() {
      return this.state.list.map((item, index) =>{
          return (
              <TodoItem 
                key={item}
                content={item} 
                index={index}
                deleteItem={this.handleDelete}
              />
            )
          })
    }

    handleDelete(index) {
      //immutable 
      //state 不允许我们做任何的改变，所以拷贝一个list副本出来使用
      // const list = [...this.state.list];
      this.setState((prevState) => {
        const list = [...prevState.list];
        list.splice(index,1);
        return {list}
      });
    }

    render() {
        return(
            <Fragment>
              <div>
                <label htmlFor='text'>请输入内容</label>
                <input 
                  id='text'
                  className='input'
                  value={this.state.inputValue}
                  onChange={this.onChange} 
                />
                <button onClick={this.addList}>提交</button>
              </div>
              <ul>
                {this.getTodoItem()}
              </ul>
              <Test content={this.state.inputValue} />
            </Fragment>
        )
    }
}