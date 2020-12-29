import React, { Component } from 'react';
import Todo from './Todo';
class TodoList extends Component {
  render() {

    const todos = this.props.tasks.map((todo, index) => {
      return <Todo content={todo} key={todo.id} id={todo.id} onUpdate={this.props.onUpdate} onDelete={this.props.onDelete} />
    })
    
    return (
      <div className='list-wrapper'>
        {todos}
      </div>
    );
  }
}
export default TodoList;