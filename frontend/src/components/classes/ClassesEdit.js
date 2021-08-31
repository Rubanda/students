import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { classesActions } from '../../store/actions/classesActions'
import api from '../../utils/api'

function ClassesEdit() {

  const params = useParams()
  const dispatch = useDispatch()
  const [errors, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [values, setValues] = React.useState({name: null})

  const history = useHistory()

  const handleChange = (e) => {setValues({...values, name: e.target.value})}

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()

    const info = { ...values }
    
    await api.put(`/api/classes/${params.id}`, info)
      .then(async(response) => {
        dispatch(await classesActions.fetchClasses())
        setLoading(false)
        history.push("/classes")
      })
      .catch(error => {
        console.log("Error creating class")
        setLoading(false)
        setError(error?.response?.data)
      })
    
  }

  React.useEffect(() => {
    if (!values.name) {
      api.get(`/api/classes/${params.id}`)
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
    <div className="cards__c-card">
        
        <form onSubmit={handleSubmit} >
          {errors && <div className="error">{errors?.message}</div>}
          <div className='cards__c-card__form'>
            <input type="text" value={values.name || ""} onChange={handleChange} required />
            <button
              className="cards__c-card__action-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Updating..." : "Updating Class"}
            </button>
          </div>
          
        </form>
    </div>
  )
}

export default ClassesEdit
