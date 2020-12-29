import React from 'react';
import { Button } from 'antd';

import { Link, withRouter } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import SubmitForm from './SubmitForm';
import TodoList from './TodoList';
import Header from './Header';
class Home extends React.Component {
  state = {
    tasks: []
  };

  handleSubmit = task => {

    axios.post(`http://localhost:3001/todos`, task)
      .then(res => {
        console.log("Recieved data ", res.data);
        this.setState({ tasks: [...this.state.tasks, res.data] });
      });

  }

  handleDelete = (index) => {
    const newArr = [...this.state.tasks];
    let pos = -1;
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].id === index) {
        pos = i;
        break;
      }
    }
    if (pos === -1) return;
    let task = newArr[pos];
    console.log(task);
    axios.delete(`http://localhost:3001/todos`, { data: task })
      .then(res => {
        console.log("In Frontend", res.data);
      });
    newArr.splice(pos, 1);
    this.setState({ tasks: newArr });
  }

  handleUpdate = (task) => {
    const newArr = [...this.state.tasks];

    let pos = -1;
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].id === task.id) {
        pos = i;
        break;
      }
    }

    if (pos === -1) return;
    newArr[pos].name = task.name;
    newArr[pos].startDate = task.startDate;
    newArr[pos].endDate = task.endDate;
    let updateTask = newArr[pos];
    console.log(updateTask);

    axios.put(`http://localhost:3001/todos`, { data: updateTask })
      .then(res => {
        console.log("Updating In Frontend", res.data);
      });
    this.setState({ tasks: newArr });
  }

  performAPICall = () => {

    let todoData = [];
    axios.get(`http://localhost:3001/todos`)
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          todoData.push(res.data[i]);
        }
      })
      .then(() => {
        for (let i = 0; i < todoData.length; i++) {
          this.setState({ tasks: [...this.state.tasks, todoData[i]] });
        }
      });
  }

  componentDidMount() {
    this.performAPICall();
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='card frame'>
          <Link to="/search">
            <Button className="btn-block" type="primary" block={true}>
              Search
            </Button>
          </Link>
          <Header numTodos={this.state.tasks.length} />
          <TodoList tasks={this.state.tasks} onDelete={this.handleDelete}
            onUpdate={this.handleUpdate} />
          <SubmitForm onFormSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
