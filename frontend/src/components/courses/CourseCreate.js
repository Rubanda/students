import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { coursesActions } from '../../store/actions/coursesActions'
import api from '../../utils/api'

const CoursesCreate = () =>{

  const dispatch = useDispatch()
  const [values, setValues] = React.useState({name: ""})
  const [errors, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const history = useHistory()
  console.log("---------->>>>>> here", history )

  const handleChange = (e) => {setValues({...values, name: e.target.value})}

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()

    const info = { ...values }
    
    await api.post("/api/courses", info)
      .then(async (response) => {
        if (response.status === 201) {
          dispatch(await coursesActions.fetchCourses(response.data))
        }
        history.push("/courses")
      })
      .catch(error => {
        console.log("Error creating course")
        setError(error?.response?.data)
      })
    
    setLoading(true)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {errors && <div className="error">{errors?.message}</div>}
        <input type="text" value={values.name || ""} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Course"}</button>
      </form>
    </div>
  )
}

export default CoursesCreate
