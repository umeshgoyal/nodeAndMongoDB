import React from "react";

class SubmitForm extends React.Component {
  state = { name: "", startDate: "", endDate: "" };

  handleSubmit = event => {
    event.preventDefault();
    if (
      this.state.name === "" ||
      this.state.startDate === "" ||
      this.state.endDate === ""
    )
      return;
    this.props.onFormSubmit(this.state);
    this.setState({
      name: "",
      startDate: "",
      endDate: ""
    });
  };
  handleInputChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { name } = this.state;
    const { startDate } = this.state;
    const { endDate } = this.state;
    return (
      <form onSubmit={this.handleSubmit} style={{ display: "block" }}>
        <div class="input-container">
          <input
            type="text"
            className="input-text"
            placeholder="Enter Item"
            name="name"
            value={name}
            onChange={this.handleInputChange}
          />
        </div>

        <div class="input-container">
          <input
            type="date"
            placeholder="Start Date"
            className="input-date"
            name="startDate"
            value={startDate}
            onChange={this.handleInputChange}
          />
        </div>
        <div class="input-container">
          <input
            type="date"
            className="input-date"
            placeholder="End Date"
            name="endDate"
            value={endDate}
            onChange={this.handleInputChange}
          />
        </div>
        <div style={{ margin: "25px 0px 0px" }}>
          <button class="primary-button">Add To-Do</button>
          <button class="secondary-button" onClick={this.props.onClose}>
            Close
          </button>
        </div>
      </form>
    );
  }
}
export default SubmitForm;
