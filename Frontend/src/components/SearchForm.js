import React, { Component } from "react";
import axios from "axios";

import { Link, withRouter } from "react-router-dom";
import TodoList from "./TodoList";
import { config } from "../index";

class SearchForm extends Component {
  state = {
    tasks: [],
    name: "",
    startDate: "",
    endDate: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.startDate === "" || this.state.endDate === "") return;

    let todoData = [];
    let task = this.state;
    axios
      .get(`${config.endpoint}/todos`, {
        params: {
          startDateMin: task.startDate,
          startDateMax: task.endDate,
        },
      })
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          todoData.push(res.data[i]);
        }
      })
      .then(() => {
        this.setState({ tasks: [] });
        for (let i = 0; i < todoData.length; i++) {
          this.setState({ tasks: [...this.state.tasks, todoData[i]] });
        }
      });
    console.log(todoData);
    this.setState({
      name: "",
      startDate: "",
      endDate: ""
    });
  };
  handleDelete = index => {
    const newArr = [...this.state.tasks];
    let pos = -1;
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i]._id === index) {
        pos = i;
        break;
      }
    }
    if (pos === -1) return;
    let task = newArr[pos];
    console.log(task);
    axios.delete(`${config.endpoint}/todos`, { data: task }).then(res => {
      console.log("In Frontend", res.data);
    });
    newArr.splice(pos, 1);
    this.setState({ tasks: newArr });
  };
  handleUpdate = task => {
    const newArr = [...this.state.tasks];

    let pos = -1;
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i]._id === task._id) {
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
    axios.put(`${config.endpoint}/todos`, { data: updateTask }).then(res => {
      console.log("Updating In Frontend", res.data);
    });
    this.setState({ tasks: newArr });
  };
  handleInputChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  performAPICall = () => {
    let todoData = [];
    axios
      .get(`${config.endpoint}/todos`)
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
  };

  componentDidMount() {
    this.performAPICall();
  }

  render() {
    const { startDate } = this.state;
    const { endDate } = this.state;
    return (
      <div className="wrapper">
        <header className="header">
          <div className="header-content">
            <div>
              <p className="header-text">Crio Notes App</p>
            </div>
            <div className="header-action-container">
              <div>
                <Link to="/">
                  <button className="primary-button" block={true}>
                    All To-Dos
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </header>
        <div className="main-section">
          {/* <Link to="/">
            <button className="primary-button">Back</button>
          </Link> */}
          <form onSubmit={this.handleSubmit}>
            <input
              type="date"
              placeholder="Start Date"
              className="input-date"
              name="startDate"
              value={startDate}
              onChange={this.handleInputChange}
            />
            <input
              type="date"
              className="input-date"
              placeholder="End Date"
              name="endDate"
              value={endDate}
              onChange={this.handleInputChange}
            />
            <button style={{ padding: "10px 30px" }} className="primary-button">
              Search
            </button>
          </form>
          <div style={{ marginTop: "40px" }}>
            <TodoList
              tasks={this.state.tasks}
              onDelete={this.handleDelete}
              onUpdate={this.handleUpdate}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(SearchForm);
