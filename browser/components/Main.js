import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { toggleNewStudentForm, fetchStudents } from '../store';

import StudentList from './StudentList.js';
import SingleStudent from './SingleStudent.js';
import NewStudentForm from './NewStudentForm.js';

/* export default */ class Main extends Component {
  /*   constructor(props) {
    super(props);
    this.state = {
      students: [],
      selectedStudent: {},
      showStudent: false,
    };

    this.selectStudent = this.selectStudent.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addStudent = this.addStudent.bind(this);
  } */
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    console.log('Main props', this.props);
    //this.getStudents();
    this.props.getStudents();
  }

  /*   async getStudents() {
    console.log('fetching');
    try {
      const { data } = await axios.get('/student');
      this.setState({ students: data });
      console.log('This is the State', this.state);
    } catch (err) {
      console.error(err);
    }
  } */
  /*   async addStudent(student) {
    const response = await axios.post('/student', student);
    const newStudent = response.data;
    this.setState({
      students: [...this.state.students, newStudent],
    });
  } */
  /* selectStudent(student) {
    return this.setState({
      selectedStudent: student,
    });
  } */

  handleClick(e) {
    /* return this.setState({
      showStudent: !this.state.showStudent,
    }); */
    console.log('handleClick', this.props);
    this.props.showStudent(); //redux refactor
  }

  render() {
    return (
      <div>
        <h1>Students</h1>
        <button onClick={this.handleClick}>Add Student</button>
        {
          //this.state.showStudent
          this.props.showStudentForm ? (
            <NewStudentForm /* addStudent={this.addStudent} */ />
          ) : null
        }
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tests</th>
            </tr>
          </thead>
          <StudentList
          /* students={this.state.students}
            selectStudent={this.selectStudent} */
          />
        </table>
        {
          //this.state.selectedStudent.id
          this.props.selectedStudent.id ? (
            <SingleStudent /* student={this.state.selectedStudent} */ />
          ) : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    showStudent: () => dispatch(toggleNewStudentForm()),
    getStudents: () => dispatch(fetchStudents()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
