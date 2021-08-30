import api from "../../utils/api";
import { actionTypes } from "./actionTypes";

export const coursesActions = {
  fetchCourses: async () => {
    let response;

    try {
      response = await api.get("/api/courses");
    } catch (error) {
      response = error.response
    }

    if (response?.status === 200) {
      return {
        type: actionTypes.ADD_COURSES,
        payload: response.data
      }
    } else {
      return {
        type: actionTypes.ADD_COURSES_ERROR,
        payload: {
          "fetch_courses": response.data
        }
      }
    }
  },
  clearCourses: () => {
    return {
      type: actionTypes.CLEAR_COURSES,
    }
  },
  clearCoursesErrors: () => {
    return {
      type: actionTypes.CLEAR_COURSES_ERROR,
    }
  }
}