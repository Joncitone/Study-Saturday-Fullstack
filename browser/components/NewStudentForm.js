import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewStudent } from '../store';

/* export default */ class NewStudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.addStudent(this.state);
    this.setState({
      firstName: '',
      lastName: '',
      email: '',
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="firstName">
          First Name:
          <input
            type="text"
            name="firstName"
            onChange={this.handleChange}
            value={this.state.firstName}
          />
        </label>

        <label htmlFor="lastName">
          Last Name:
          <input
            type="text"
            name="lastName"
            onChange={this.handleChange}
            value={this.state.lastName}
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
        </label>

        <button type="submit">Submit New Student</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addStudent: (student) => dispatch(postNewStudent(student)),
  };
};

export default connect(null, mapDispatchToProps)(NewStudentForm);
