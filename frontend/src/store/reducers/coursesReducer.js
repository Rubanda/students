import { actionTypes } from "../actions/actionTypes";

const initialState = {
  courses: null,
  errors: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_COURSES: {
      return {
        ...state,
        courses: action.payload
      }
    }
    case actionTypes.CLEAR_COURSES: {
      return {
        ...state,
        courses: initialState.courses
      }
    }
    case actionTypes.ADD_COURSES_ERROR: {
      return {
        ...state,
        errors: action.payload
      }
    }
    case actionTypes.CLEAR_COURSES_ERROR: {
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