import React from 'react';

class SubmitForm extends React.Component {
    state = { name: '',
    startDate: '',
    endDate: ''};
  
    handleSubmit = (event) => {
      event.preventDefault();
      if(this.state.name === '' || this.state.startDate==='' || this.state.endDate==='') return;
      this.props.onFormSubmit(this.state);
      this.setState({ 
        name: '' ,
        startDate: '',
        endDate: ''});
    }
    
    handleInputChange = (event) => {
      event.preventDefault()
      this.setState({
         [ event.target.name]: event.target.value
      })
    }
  
    render() {
  
      const {name} = this.state;
      const {startDate} = this.state;
      const { endDate} = this.state;
      return(
        <form onSubmit={this.handleSubmit}>
          <input 
            type='text'
            className='input'
            placeholder='Enter Item'
            name='name'
            value={name}
            onChange={this.handleInputChange}
          />
          
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
      );
    }
  }
  export default SubmitForm;