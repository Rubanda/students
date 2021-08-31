import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { coursesActions } from '../../store/actions/coursesActions'
import api from '../../utils/api'

const CoursesEdit = () => {

  const params = useParams()
  const history = useHistory()

  const dispatch = useDispatch()

  const [errors, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [values, setValues] = React.useState({name: null})


  const handleChange = (e) => {setValues({...values, name: e.target.value})}

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()

    const info = { ...values }
    
    await api.put(`/api/courses/${params.id}`, info)
      .then(async(response) => {
        dispatch(await coursesActions.fetchCourses())
        setLoading(false)
        history.push("/courses")
      })
      .catch(error => {
        console.log("Error creating class")
        setLoading(false)
        setError(error?.response?.data)
      })
    
  }

  React.useEffect(() => {
    if (!values.name) {
      api.get(`/api/courses/${params.id}`)
      .then(response => {
        setValues({...values, name: response.data?.name})
      })
      .catch(error => {
        console.log("Error fetching class")
        setError(error?.response?.data)
      })
    }
  }, [params.id, values])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {errors && <div className="error">{ errors?.message }</div>}
        <input type="text" value={values.name || ""} onChange={handleChange} required />
        <button sytle={{ padding: '1px', marginLeft: '20px'}} type="submit" disabled={loading}>{loading ? "Editing..." : "Edit Course"}</button>
      </form>
    </div>
  )
}

export default CoursesEdit
