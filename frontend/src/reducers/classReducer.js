import { CLASS_LIST_REQUEST, CLASS_LIST_SUCCESS, CLASS_LIST_ERROR } from '../constants/classConstant'

export  const classReducer = (state={loading:true, data:[]},action)=> {
  switch (action.type) {
    case CLASS_LIST_REQUEST:
      return { loading: true }
    case CLASS_LIST_SUCCESS:
      return { loading: false, data: action.payload }
    case CLASS_LIST_ERROR:
      return { loading: false, data: action.payload }
    default:
      return state
  }
}
