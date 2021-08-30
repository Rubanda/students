import { actionTypes } from "../actions/actionTypes";

const initialState = {
  classes: null,
  errors: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CLASSES: {
      return {
        ...state,
        classes: action.payload
      }
    }
    case actionTypes.CLEAR_CLASSES: {
      return {
        ...state,
        classes: initialState.classes
      }
    }
    case actionTypes.ADD_CLASSES_ERROR: {
      return {
        ...state,
        errors: action.payload
      }
    }
    case actionTypes.CLEAR_CLASSES_ERROR: {
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