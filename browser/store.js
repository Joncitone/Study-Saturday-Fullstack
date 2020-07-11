import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';

const middleware = applyMiddleware(thunkMiddleware);

//ACTION TYPES
const ADD_NEW_STUDENT = 'ADD_NEW_STUDENT';
const SELECTED_STUDENT = 'SELECTED_STUDENT';
const SHOW_STUDENT = 'SHOW_STUDENT';
const FETCH_STUDENTS = 'FETCH_STUDENTS';

//ACTION CREATORS
const addNewStudent = (student) => {
  return {
    type: ADD_NEW_STUDENT,
    student,
  };
};
const selectedStudent = (student) => {
  return {
    type: SELECTED_STUDENT,
    student,
  };
};
const showStudent = () => {
  return {
    type: SHOW_STUDENT,
  };
};
const gotStudentsFromServer = (students) => {
  console.log('action creator', students);
  return {
    type: FETCH_STUDENTS,
    students,
  };
};
//Thunk Creators
export const fetchStudents = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/student');
      console.log(response);
      dispatch(gotStudentsFromServer(response.data));
    } catch (error) {
      console.log('Error in fetchStudents Thunk', error.message);
    }
  };
};
export const postNewStudent = (student) => {
  return async (dispatch) => {
    const response = await axios.post('/student', student);
    dispatch(addNewStudent(response.data));
  };
};
export const studentSelector = (student) => {
  return (dispatch) => {
    dispatch(selectedStudent(student));
  };
};
export const toggleNewStudentForm = () => {
  return (dispatch) => {
    dispatch(showStudent());
  };
};

//Initial State
const initialState = {
  students: [],
  selectedStudent: {},
  showStudentForm: false,
};
//Reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENTS:
      return { ...state, students: action.students };
    case ADD_NEW_STUDENT:
      return { ...state, students: [...state.students, action.student] };
    case SELECTED_STUDENT:
      return { ...state, selectedStudent: action.student };
    case SHOW_STUDENT:
      return { ...state, showStudentForm: !state.showStudentForm };
    default:
      return state;
  }
};

const store = createStore(reducer, middleware);
export default store;
