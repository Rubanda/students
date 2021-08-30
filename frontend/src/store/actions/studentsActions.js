import api from "../../utils/api";
import { actionTypes } from "./actionTypes";

export const studentsActions = {
  fetchStudents: async () => {
    let response;

    try {
      response = await api.get("/api/students");
    } catch (error) {
      response = error.response
    }

    if (response?.status === 200) {
      return {
        type: actionTypes.ADD_STUDENTS,
        payload: response.data
      }
    } else {
      return {
        type: actionTypes.ADD_STUDENTS_ERROR,
        payload: {
          "fetch_courses": response.data
        }
      }
    }
  },
  clearCourses: () => {
    return {
      type: actionTypes.CLEAR_STUDENTS,
    }
  },
  clearCoursesErrors: () => {
    return {
      type: actionTypes.CLEAR_STUDENTS_ERROR,
    }
  }
}