import React, { Component } from 'react';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      endDate: '',
      startDate: '',
      mode: 'view'
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleInputChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSave(event) {
    event.preventDefault();
    if (this.state.name === '' || this.state.startDate === '' || this.state.endDate === '') return;
    this.props.onUpdate(this.state);
    this.setState({
      name: this.state.name,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      mode: 'view'
    });
  }

  handleEdit() {
    this.setState({ mode: 'edit' });
  }

  renderInputField() {
    if (this.state.mode === 'view') {
      return <div></div>;
    } else {
      return (
        <p>
          <form onSubmit={this.handleSave}>
            <input
              name='name'
              onChange={this.handleInputChange}
              value={this.state.name}
            />
            <input
              name='startDate'
              value={this.state.startDate}
              onChange={this.handleInputChange}
              type='date'
            />
            <input
              type="date"
              name='endDate'
              value={this.state.endDate}
              onChange={this.handleInputChange}
            />
          </form>
        </p>
      );
    }
  }

  renderButton() {
    if (this.state.mode === 'view') {
      return (
        <button class="button3" onClick={this.handleEdit}>
          Edit
        </button>
      );
    } else {
      return (
        <button class="button1" onClick={this.handleSave}>
          Save
        </button>

      );
    }
  }

  componentDidMount() {
    var shortStartDate = this.props.content.startDate.split('T')[0];
    var shortEndDate = this.props.content.endDate.split('T')[0];
    this.setState({
      id: this.props.content.id,
      name: this.props.content.name,
      startDate: shortStartDate,
      endDate: shortEndDate
    })
  }

  render() {

    const { name } = this.state;
    const { startDate } = this.state;
    const { endDate } = this.state;
    return (
      <div className='list-item'>
        <li >
          <div>Name : {name}</div>
          <div>StartDate : {startDate}</div>
          <div>End Date :  {endDate}</div>
        </li>

        <div>
          {/* <p>Text: {this.state.text}</p> */}
          {this.renderInputField()}
          {this.renderButton()}
        </div>

        <button class="button2" onClick={() => { this.props.onDelete(this.props.id) }}> Delete</button>
      </div>
    );
  }
}
export default Todo;