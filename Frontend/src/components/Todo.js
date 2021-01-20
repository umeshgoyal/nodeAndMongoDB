import React, { Component } from "react";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      name: "",
      endDate: "",
      startDate: "",
      mode: "view"
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleInputChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSave(event) {
    event.preventDefault();
    if (
      this.state.name === "" ||
      this.state.startDate === "" ||
      this.state.endDate === ""
    )
      return;
    this.props.onUpdate(this.state);
    this.setState({
      name: this.state.name,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      mode: "view"
    });
  }

  handleEdit() {
    this.setState({ mode: "edit" });
  }

  renderInputField() {
    if (this.state.mode === "view") {
      return <div></div>;
    } else {
      return (
        <p>
          <form style={{ display: "block" }} onSubmit={this.handleSave}>
            <div className="input-container">
              <input
                name="name"
                className="input-text"
                onChange={this.handleInputChange}
                value={this.state.name}
              />
            </div>
            <div className="input-container">
              <input
                name="startDate"
                className="input-date"
                value={this.state.startDate}
                onChange={this.handleInputChange}
                type="date"
              />
            </div>
            <div className="input-container">
              <input
                type="date"
                className="input-date"
                name="endDate"
                value={this.state.endDate}
                onChange={this.handleInputChange}
              />
            </div>
          </form>
        </p>
      );
    }
  }

  renderButton() {
    if (this.state.mode === "view") {
      return (
        <button class="tertiary-button" onClick={this.handleEdit}>
          <span>
            <EditOutlined className="img-icon" />
          </span>{" "}
          Edit
        </button>
      );
    } else {
      return (
        <button class="tertiary-button" onClick={this.handleSave}>
          <SaveOutlined className="img-icon" />
          Save
        </button>
      );
    }
  }

  componentDidMount() {
    var shortStartDate = this.props.content.startDate.split("T")[0];
    var shortEndDate = this.props.content.endDate.split("T")[0];
    this.setState({
      _id: this.props.content._id,
      name: this.props.content.name,
      startDate: shortStartDate,
      endDate: shortEndDate
    });
  }

  render() {
    const { name } = this.state;
    const { startDate } = this.state;
    const { endDate } = this.state;
    return (
      <div className="list-item">
        {this.state.mode === "view" && (
          <>
            <div>
              <p className="card-title">{name}</p>
            </div>
            <table>
              <tr>
                <td>
                  <p className="card-date">Start Date</p>
                </td>
                <td style={{ textAlign: "right" }}>
                  <p className="card-date">{startDate}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="card-date">End Date</p>
                </td>
                <td style={{ textAlign: "right" }}>
                  <p className="card-date">{endDate}</p>
                </td>
              </tr>
            </table>
          </>
        )}
        {/* <div>
          <p className="card-date">StartDate : {startDate}</p>
        </div>
        <div>
          <p className="card-title">End Date : {endDate}</p>
        </div> */}

        <div>
          {/* <p>Text: {this.state.text}</p> */}
          {this.renderInputField()}
        </div>

        <div style={{ display: "inline-flex" }}>
          <div>{this.renderButton()}</div>
          <div>
            <button
              class="tertiary-button"
              onClick={() => {
                this.props.onDelete(this.props.id);
              }}
            >
              <span>
                <DeleteOutlined className="img-icon" />
              </span>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Todo;
