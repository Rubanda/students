import Axios from 'axios'
import {
  CLASS_LIST_REQUEST,
  CLASS_LIST_SUCCESS,
  CLASS_LIST_ERROR
} from '../constants/classConstant'


export const classActions = () => async (dispatch) => {
  dispatch({
    type: CLASS_LIST_REQUEST
  })
  try {
    const { data } = await Axios.get(`api/class`)
    dispatch({
      type: CLASS_LIST_SUCCESS,
      payload: data
    })
    console.log(data)

  } catch (error) {
    dispatch({
      type: CLASS_LIST_ERROR,
      payload: error.message
    })
  }
}
