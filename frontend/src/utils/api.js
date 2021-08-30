import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:8000",
  headers: {
    Accept: 'application/json',
    Content: "application/json"
  }
})

api.interceptors.request.use(request => {
  return request;
})

api.interceptors.response.use(response => {
  return response
}, (error) => {
  console.log("API error: ", error)
  return Promise.reject(error)
})

export default api;