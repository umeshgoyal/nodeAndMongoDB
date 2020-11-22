import React, {Component} from 'react';
// import { TextField, validator } from 'react-textfield';
// import Button from 'react-bootstrap/Button'
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import axios from 'axios';

class App extends Component {
    constructor(props){
      super(props)
      this.state = {
          name: '',
          startDate: '',
          endDate: ''
      }
  }


  handleSubmit = (event) => {
      event.preventDefault();
      const data = this.state;
      // console.log(this.inputFullNameRef.current.value)

      const todo ={
        name:this.state.name,
        startDate:this.state.startDate,
        endDate:this.state.endDate
      }
      console.log(todo);
      axios.post(`http://localhost:3001/todos`, { todo })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
      console.log("Final data is", data)
  }

  handleInputChange = (event) => {
    event.preventDefault()
    // console.log(event)
    // console.log(event.target.name)
    // console.log(event.target.value)
    this.setState({
       [ event.target.name]: event.target.value
    })
  }

// componentDidMount(){
//     this.inputFullNameRef.current.focus()
    // }
  render () {
      const {name} = this.state;
      const {startDate} = this.state;
      const { endDate} = this.state;
    return (
      <div className='container'>
        <h1>TODOs</h1>
        <p>Todo name is: {name}</p>
        <form onSubmit={this.handleSubmit}>
           <p>   <input type='text' placeHolder='Todo Name' value={name} name='name'  onChange={this.handleInputChange}/> </p>
           <p>   <input type='date' placeHolder='Start Date' value={startDate} name='startDate'  onChange={this.handleInputChange}/> </p>
           <p>   <input type='date' placeHolder='End Date' value={endDate} name='endDate'  onChange={this.handleInputChange}/> </p>

           {/* <DatePicker  placeHolder='End Date' value={endDate} name='endDate'  onChange={this.handleInputChange} /> */}
          <p><button>Send Message</button></p>         
        </form>
      </div>
    )
  }
}

export default App;
