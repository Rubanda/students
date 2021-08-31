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

  const handleChange = (e) => { setValues({ ...values, name: e.target.value }) }
  
  const handleCancel = () => {
    if (history.length >= 2) {
      history.goBack()
    } else {
      history.push("/classes")
    }
  }

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
      <form onSubmit={handleSubmit} style={{width: "100%"}}>
        <div style={{width: "100%"}}>
          {errors && <div className="error">{errors?.message}</div>}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label htmlFor="name">Name</label>
            <input id="name" placeholder="Name" type="text" value={values.name || ""} onChange={handleChange}  required />
          </div>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <button type="submit" disabled={loading}>{loading ? "Submiting..." : "Submit"}</button>
            <button type="reset" disabled={loading} onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CoursesCreate
