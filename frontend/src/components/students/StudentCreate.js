import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { classesActions } from '../../store/actions/classesActions'
import { studentsActions } from '../../store/actions/studentsActions'
import api from '../../utils/api'

const ClassesCreate = () =>{

  const dispatch = useDispatch()
  const [values, setValues] = React.useState({name: null})
  const classes = useSelector((state) => state.classesReducer.classes)

  
  const [errors, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const history = useHistory()


  const handleChange = (fieldName) => (e) => {setValues({...values, [fieldName]: e.target.value})}

  React.useEffect(() => {
    const fetchClasses = async () => {
      dispatch(await classesActions.fetchClasses())
    }

    if (!classes) {
      fetchClasses()
    }
  }, [dispatch, classes])

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()

    const info = { ...values }
    
    await api.post("/api/students", info)
      .then(async (response) => {
        if (response.status === 201) {
          dispatch(await studentsActions.fetchStudents(response.data))
        }
        history.push("/students")
      })
      .catch(error => {
        console.log("Error creating class")
        setError(error?.response?.data)
      })
    
    setLoading(true)
  }

  const handleCancel = () => {
    if (history.length >= 2) {
      history.goBack()
    } else {
      history.push("/classes")
    }
  }

  return (
    <div className="background-card">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
          {errors && <div className="error">{errors?.message}</div>}
          <div className="background-card__input">
            <label htmlFor="name">Name</label>
            <input className="input" type="text" id="name" placeholder="Name" value={values.name || ""} onChange={handleChange("name")} required />
          </div>
          <div className="background-card__input" >
            <label htmlFor="age">Age</label>
            <input className="input" type="text" id="name" placeholder="Age" value={values.age || ""} onChange={handleChange("age")} required />
          </div>
          <div className="background-card__input">
            <label htmlFor="class">Class</label>
              <select style={{ fontSize: "2rem"}} id="class" placeholder="Class" value={values.class_id || ""} onChange={handleChange("class_id")} required>
              <option>-</option>
              {
                classes && (
                  <>
                    {
                      classes.map(item => {
                        return (
                          <option key={item.id} value={item.id}>{ item.name }</option>
                        )
                      })
                    }
                  </>
                )
              }
            </select>
          </div>
          <div className="background-card__button">
            <button className="background-card__submit" type="submit" disabled={loading}>{loading ? "Submiting..." : "Submit"}</button>
            <button  className="background-card__cancel" type="reset" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
        </form>
      </div>
    </div>
  )
}

export default ClassesCreate
