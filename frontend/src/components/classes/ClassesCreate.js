import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { classesActions } from '../../store/actions/classesActions'
import api from '../../utils/api'

const ClassesCreate = () =>{

  const dispatch = useDispatch()
  const [values, setValues] = React.useState({name: ""})
  const [errors, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const history = useHistory()

  const handleChange = (e) => {setValues({...values, name: e.target.value})}

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()

    const info = { ...values }
    
    await api.post("/api/classes", info)
      .then(async (response) => {
        if (response.status === 201) {
          dispatch(await classesActions.fetchClasses(response.data))
        }
        history.push("/classes")
      })
      .catch(error => {
        console.log("Error creating class")
        setError(error?.response?.data)
      })
    
    setLoading(true)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {errors && <div className="error">{errors?.message}</div>}
        <input type="text" value={values.name || ""} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Class"}</button>
      </form>
    </div>
  )
}

export default ClassesCreate
