import { actionTypes } from "../actions/actionTypes";

const initialState = {
  students: null,
  errors: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_STUDENTS: {
      return {
        ...state,
        students: action.payload
      }
    }
    case actionTypes.DELETE_SINGLE_STUDENT: {
      let newStudent = state.students || []
      newStudent = newStudent.filter(item => item.id !== action.payload)
      return {
        ...state,
        students: newStudent
      }
    }
    case actionTypes.CLEAR_STUDENTS: {
      return {
        ...state,
        students: initialState.students
      }
    }
    case actionTypes.ADD_STUDENTS_ERROR: {
      return {
        ...state,
        errors: action.payload
      }
    }
    case actionTypes.CLEAR_STUDENTS_ERROR: {
      return {
        ...state,
        errors: action.payload
      }
    }
    default:
      break;
  }
  return state
}

export default reducer