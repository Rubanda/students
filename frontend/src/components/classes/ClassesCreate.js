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
    <div className="classes-header">
      <div className="cards__c-card">
        <form onSubmit={handleSubmit}>
          <div>
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
    </div>
  )
}

export default ClassesCreate
