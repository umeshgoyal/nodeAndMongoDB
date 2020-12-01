import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Todo from './Todo';
import axios from 'axios';
 class TodoList extends Component {
   render(){
  var todoData = [];
  axios.get(`http://localhost:3001/todos`)
  .then(res => {
    // console.log(res);
    todoData.push(res.data);
    // console.log(res.data);
  });

    const todos = this.props.tasks.map((todo, index) => {
      return <Todo content={todo} key={todo.id} id={todo.id}  onUpdate={this.props.onUpdate} onDelete={this.props.onDelete} />
    })
    return( 
      <div className='list-wrapper'>
        {todos} 
      </div>
    );
  }
  }
  export default TodoList;