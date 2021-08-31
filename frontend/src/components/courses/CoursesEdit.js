import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { coursesActions } from '../../store/actions/coursesActions'
import { studentsActions } from '../../store/actions/studentsActions'
import api from '../../utils/api'

const CoursesEdit = () => {

  const params = useParams()
  const history = useHistory()

  const dispatch = useDispatch()

  const [errors, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [values, setValues] = React.useState({name: null})
  const students = useSelector((state) => state.studentsReducer.students)
  const [studentValue, setStudentValue] = React.useState(null)

  const handleChange = (e) => {setValues({...values, name: e.target.value})}

  const handleStudentChange = (e) => { setStudentValue(e.target.value) }

  const handleCancel = () => {
    if (history.length >= 2) {
      history.goBack()
    } else {
      history.push("/classes")
    }
  }

  React.useEffect(() => {
    const fetchStudents = async () => {
      dispatch(await studentsActions.fetchStudents())
    }

    if (!students) {
      fetchStudents()
    }
  }, [dispatch, students])

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
        setValues({...response.data})
      })
      .catch(error => {
        console.log("Error fetching class")
        setError(error?.response?.data)
      })
    }
  }, [params.id, values])

  const handleAddStudent = async (e) => {
    setLoading(true)
    e.preventDefault()

    const info = { student_id: studentValue }
    
    await api.post(`/api/courses/${params.id}/students`, info)
      .then(async (response) => {
        setStudentValue(null)
        dispatch(await coursesActions.fetchCourses())
        api.get(`/api/courses/${params.id}`)
        .then(response => {
          setValues({...response.data})
        })
        .catch(error => {
          console.log("Error fetching class")
          setError(error?.response?.data)
        })
        setLoading(false)
      })
      .catch(error => {
        console.log("Error creating class")
        setLoading(false)
        setError(error?.response?.data)
      })
  }

  const handleRemoveStudent = async (studentId) => {
    setLoading(true)
    
    await api.delete(`/api/courses/${params.id}/students/${studentId}`,)
      .then(async(response) => {
        dispatch(await coursesActions.fetchCourses())
        api.get(`/api/courses/${params.id}`)
        .then(response => {
          setValues({...response.data})
        })
        .catch(error => {
          console.log("Error fetching class")
          setError(error?.response?.data)
        })
        setLoading(false)
      })
      .catch(error => {
        console.log("Error creating class")
        setLoading(false)
        setError(error?.response?.data)
      })
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
      <div style={{ marginTop: "16px" }}>
        <div style={{marginBottom: "10px"}}>
          <h6 style={{fontSize: "16px", marginBottom: "10px"}}>Course Students</h6>
          {
            values?.students && (
              <>
                {
                  values.students.map(item => {
                    return (
                      <div key={item.id} style={{display: "flex", justifyContent: "space-between", marginBottom: "10px"}}>
                        <Link to={`/students/${item.id}`}>{item.name}</Link>
                        <button onClick={() => {handleRemoveStudent(item.id)}}>Delete</button>
                      </div>
                    )
                  })
                }
              </>
            )
          }
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="course" style={{marginBottom: "10px"}}>Add Students</label>
          <select id="course" placeholder="Courses" value={studentValue || ""} onChange={handleStudentChange} required>
            <option>-</option>
            {
              students && (
                <>
                  {
                    students.map(item => {
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
        <button onClick={handleAddStudent} style={{marginTop: "16px"}}>Add Student</button>
      </div>
    </div>
  )
}

export default CoursesEdit
