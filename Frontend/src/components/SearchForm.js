import React, {Component} from 'react';
import { Button } from 'antd';
import ReactDOM from 'react-dom';
import axios from 'axios';

import {Link, BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import TodoList from './TodoList';
import App from '../App';

class SearchForm extends Component{
    state = {
      tasks: [],
    name: '',
    startDate: '',
    endDate: ''};
  

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.startDate === '' || this.state.endDate==='') return;
        
        let todoData = [];
        let task = this.state;
        axios.post(`http://localhost:3001/todos/search`,task)
        .then(res => {
          for( let i =0 ;i< res.data.length;i++) {
            todoData.push(res.data[i]);
          }
        })
        .then( ()=>{
          this.setState({tasks:[]});
          for( let i =0 ;i< todoData.length;i++) {
          this.setState({tasks: [...this.state.tasks, todoData[i]]});
          }
        });
        console.log(todoData);
        this.setState({ 
          name: '' ,
          startDate: '',
          endDate: ''});
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
      handleInputChange = (event) => {
        event.preventDefault()
        this.setState({
           [ event.target.name]: event.target.value
        })
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
  
        const {name} = this.state;
        const {startDate} = this.state;
        const { endDate} = this.state;
        return(
          <div className="home-container container"> 
            <Link to="/">
                <Button className="btn-block" type="primary"  >
                    Back
                </Button>
            </Link> 
          <form onSubmit={this.handleSubmit}>
             <input 
             type='date'
             placeholder='Start Date'
             className='input'
              name='startDate'
              value={startDate}
              onChange={this.handleInputChange}
            />
             <input 
             type='date'
             className='input'
              placeholder='End Date'
              name='endDate'
              value={endDate}
              onChange={this.handleInputChange}
            />
            <button class='button1'>Submit</button>
          </form>
          <TodoList tasks={this.state.tasks} onDelete={this.handleDelete}  />
         
          </div> 
        );
    }
}
export default withRouter(SearchForm);
