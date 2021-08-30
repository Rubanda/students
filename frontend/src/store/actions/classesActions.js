import api from "../../utils/api";
import { actionTypes } from "./actionTypes";

export const classesActions = {
  fetchClasses: async () => {
    let response;

    try {
      response = await api.get("/api/classes");
    } catch (error) {
      response = error.response
    }

    if (response?.status === 200) {
      return {
        type: actionTypes.ADD_CLASSES,
        payload: response.data
      }
    } else {
      return {
        type: actionTypes.ADD_CLASSES_ERROR,
        payload: {
          "fetch_classes": response.data
        }
      }
    }
  },
  deleteClass: async (id, dispatch) => {
    let response;

    try {
      response = await api.delete(`/api/classes/${id}`);
    } catch (error) {
      response = error.response
    }

    if (response?.status === 200) {
      dispatch({
        type: actionTypes.DELETE_SINGLE_CLASS,
        payload: id
      })
    } else {
      return {
        type: actionTypes.ADD_CLASSES_ERROR,
        payload: {
          "fetch_classes": response.data
        }
      }
    }
  },
  clearClasses: () => {
    return {
      type: actionTypes.CLEAR_CLASSES,
    }
  },
  clearClassesErrors: () => {
    return {
      type: actionTypes.CLEAR_CLASSES_ERROR,
    }
  }
}