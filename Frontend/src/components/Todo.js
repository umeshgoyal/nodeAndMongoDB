import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
 const Todo = (props) => {
    return(
      <div className='list-item'>
        <li >
              <div>Name : {props.content.name}</div>
              <div>StartDate : {props.content.startDate}</div>
              <div>End Date :  {props.content.endDate}</div>
        </li>
        <button class="button3" > Update</button>
        <button class="button2"onClick={() => {props.onDelete(props.id)} }> Delete</button>
      </div>
    );
}
export default Todo;