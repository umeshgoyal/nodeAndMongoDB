import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import axios from 'axios';
import SubmitForm from './components/SubmitForm';
import TodoList from './components/TodoList';
import Todo from './components/Todo';
import Header from './components/Header';
class App extends React.Component {
  state = {
    tasks: [{name:'task 1',startDate:'2020-10-30',endDate:'2020-10-30'}]
  };

  handleSubmit = task => {
    this.setState({tasks: [...this.state.tasks, task]});
    
     axios.post(`http://localhost:3001/todos`,  task )
      .then(res => {
        console.log(res.task);
      });
      console.log("Final data is", task)
  }
  
  handleDelete = (index) => {
    const newArr = [...this.state.tasks];
    // console.log(newArr[index],index);
    let task = newArr[index];
    console.log(task);
    axios.delete(`http://localhost:3001/todos`,  { data: task })
    .then(res => {
      console.log("In Frontend",res.data);
    });
    newArr.splice(index, 1);
    this.setState({tasks: newArr});
  }
  performAPICall =  () => {
    
    let todoData = [];
    axios.get(`http://localhost:3001/todos`)
    .then(res => {
      for( let i =0 ;i< res.data.length;i++) {
        todoData.push(res.data[i]);
      }
    })
    .then( ()=>{
      for( let i =0 ;i< todoData.length;i++) {
      this.setState({tasks: [...this.state.tasks, todoData[i]]});
      }
    });
  }
  
  componentDidMount() {
     this.performAPICall();
  }
  render() {
    return(
      <div className='wrapper'>
        <div className='card frame'>
          <Header numTodos={this.state.tasks.length} />
          <TodoList tasks={this.state.tasks} onDelete={this.handleDelete} />
          <SubmitForm onFormSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  } 
}







export default App;