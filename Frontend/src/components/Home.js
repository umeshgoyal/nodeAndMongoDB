import React from "react";

import { Link, withRouter } from "react-router-dom";
// import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import SubmitForm from "./SubmitForm";
import TodoList from "./TodoList";
import { Modal } from "antd";
import "antd/dist/antd.css";
import {
  EditOutlined,
  PlusCircleOutlined} from "@ant-design/icons";
import { config } from "../index";

class Home extends React.Component {
  state = {
    tasks: [],
    isAddModalVisible: false
  };

  showModal = () => {
    this.setState({ isAddModalVisible: true });
  };

  handleOk = () => {
    this.setState({ isAddModalVisible: false });
  };

  handleCancel = () => {
    this.setState({ isAddModalVisible: false });
  };

  handleSubmit = task => {
    axios.post(`${config.endpoint}/todos`, task).then(res => {
      console.log("Recieved data ", res.data);
      this.setState({ tasks: [...this.state.tasks, res.data] });
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
    axios.delete(`${config.endpoint}/todos/${task._id}`).then(res => {
      console.log("In Frontend", res.data);
    });
    newArr.splice(pos, 1);
    this.setState({ tasks: newArr });
  };

  handleUpdate = async task => {
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

    await axios.put(`${config.endpoint}/todos`, updateTask).then(res => {
      console.log("Updating In Frontend", res.data);
    });
    this.setState({ tasks: newArr });
  };

  performAPICall = async () => {
    let todoData = [];
    await axios
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

  async componentDidMount() {
    await this.performAPICall();
  }

  render() {
    return (
      <div>
        <Modal
          title={null}
          footer={null}
          visible={this.state.isAddModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>
            <p className="modal-title"> Add To-Do</p>{" "}
          </div>
          <div>
            <p className="modal-sub-title">
              {" "}
              Fill the following information to create a To-Do.
            </p>{" "}
          </div>
          <SubmitForm
            onFormSubmit={this.handleSubmit}
            onClose={this.handleCancel}
          />
        </Modal>
        <header className="header">
          <div className="header-content">
            <div>
              <p className="header-text">Crio Notes App</p>
            </div>

            <div className="header-action-container">
              <div>
                <Link to="/search">
                  <button className="primary-button" block={true}>
                    Search
                  </button>
                </Link>
              </div>
              <button
                className="primary-button only-desktop"
                onClick={this.showModal.bind(this)}
              >
                <span>
                  <EditOutlined className="img-icon" />
                </span>
                Add To-Do
              </button>
            </div>
          </div>
        </header>

        <div className="main-section">
          {/* <Header numTodos={this.state.tasks.length} /> */}
          <div>
            <TodoList
              tasks={this.state.tasks}
              onDelete={this.handleDelete}
              onUpdate={this.handleUpdate}
            />
          </div>
          {/* <SubmitForm onFormSubmit={this.handleSubmit} /> */}
        </div>
        <div class="add-todo-section" onClick={this.showModal.bind(this)}>
          <span>
            <PlusCircleOutlined
              className="img-icon"
              style={{ fontWeight: "700" }}
            />
          </span>{" "}
          Add To-Do
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
