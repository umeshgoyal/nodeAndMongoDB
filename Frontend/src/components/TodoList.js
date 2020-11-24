import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Todo from './Todo';
import axios from 'axios';
 const TodoList = (props) => {
  var todoData = [];
  axios.get(`http://localhost:3001/todos`)
  .then(res => {
    // console.log(res);
    todoData.push(res.data);
    // console.log(res.data);
  });
// console.log(todoData[0].name);
// console.log(props);
// props.tasks
let newarray = [...props.tasks,todoData[0]];
// props.setState({tasks: [...props.tasks, todoData]});
    const todos = props.tasks.map((todo, index) => {
      return <Todo content={todo} key={index} id={index} onDelete={props.onDelete} />
    })
    return( 
      <div className='list-wrapper'>
        {todos} 
      </div>
    );
  }
  export default TodoList;