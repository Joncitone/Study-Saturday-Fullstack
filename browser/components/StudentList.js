import React from 'react';
import { connect } from 'react-redux';
import { studentSelector } from '../store';

const StudentList = (props) => {
  return (
    <tbody>
      {props.students.map((student) => (
        <tr key={student.id}>
          <td>{student.fullName}</td>
          <td onClick={() => props.selectStudent(student)}>Details</td>
        </tr>
      ))}
    </tbody>
  );
};

const mapStateToProps = (state) => {
  return {
    students: state.students,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectStudent: (student) => dispatch(studentSelector(student)),
  };
};

//export default StudentList;

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
