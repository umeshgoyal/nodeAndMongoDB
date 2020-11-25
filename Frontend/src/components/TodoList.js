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