import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { classesActions } from '../../store/actions/classesActions'
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
  const [courseValues, setCourseValues] = React.useState(null)
  const classes = useSelector((state) => state.classesReducer.classes)
  const courses = useSelector((state) => state.coursesReducer.courses)

  const handleChange = (fieldName) => (e) => {setValues({...values, [fieldName]: e.target.value})}
  
  const handleCourseChange = (e) => { setCourseValues(e.target.value) }

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
    
    await api.put(`/api/students/${params.id}`, info)
      .then(async(response) => {
        dispatch(await studentsActions.fetchStudents())
        setLoading(false)
        history.push("/students")
      })
      .catch(error => {
        console.log("Error creating class")
        setLoading(false)
        setError(error?.response?.data)
      })
  }

  React.useEffect(() => {
    if (!values.name) {
      api.get(`/api/students/${params.id}`)
      .then(response => {
        setValues({...response.data})
      })
      .catch(error => {
        console.log("Error fetching class")
        setError(error?.response?.data)
      })
    }
  }, [params.id, values])

  React.useEffect(() => {
    const fetchClasses = async () => {
      dispatch(await classesActions.fetchClasses())
    }

    if (!classes) {
      fetchClasses()
    }
  }, [dispatch, classes])

  React.useEffect(() => {
    const fetchCourses = async () => {
      dispatch(await coursesActions.fetchCourses())
    }

    if (!courses) {
      fetchCourses()
    }
  }, [dispatch, courses])

  const handleAddCourse = async (e) => {
    setLoading(true)
    e.preventDefault()

    const info = { course_id: courseValues }
    
    await api.post(`/api/students/${params.id}/courses`, info)
      .then(async (response) => {
        setCourseValues(null)
        dispatch(await studentsActions.fetchStudents())
        api.get(`/api/students/${params.id}`)
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

  const handleRemoveCourse = async (courseId) => {
    setLoading(true)
    
    await api.delete(`/api/students/${params.id}/courses/${courseId}`,)
      .then(async(response) => {
        dispatch(await studentsActions.fetchStudents())
        api.get(`/api/students/${params.id}`)
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
          <div style={{display: "flex", flexDirection: "column"}}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Name" value={values.name || ""} onChange={handleChange("name")} required />
          </div>
          <div style={{display: "flex", flexDirection: "column"}}>
            <label htmlFor="age">Age</label>
            <input type="text" id="name" placeholder="Age" value={values.age || ""} onChange={handleChange("age")} required />
          </div>
          <div style={{display: "flex", flexDirection: "column"}}>
            <label htmlFor="class">Class</label>
            <select id="class" placeholder="Class" value={values.class_id || ""} onChange={handleChange("class_id")} required>
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
          <div style={{display: 'flex', justifyContent: "space-between", marginTop: "16px"}}>
            <button sytle={{ padding: '1px', marginLeft: '20px', }} type="submit" disabled={loading}>{loading ? "Submiting..." : "Submit"}</button>
            <button sytle={{ padding: '1px', marginLeft: '20px',}} type="reset" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </form>
      <div style={{ marginTop: "16px" }}>
        <div style={{marginBottom: "10px"}}>
          <h6 style={{fontSize: "16px", marginBottom: "10px"}}>Student Courses</h6>
          {
            values?.courses && (
              <>
                {
                  values.courses.map(item => {
                    return (
                      <div key={item.id} style={{display: "flex", justifyContent: "space-between"}}>
                        <Link to={`/courses/${item.id}`}>{item.name}</Link>
                        <button onClick={() => {handleRemoveCourse(item.id)}}>Delete</button>
                      </div>
                    )
                  })
                }
              </>
            )
          }
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="course" style={{marginBottom: "10px"}}>Add Courses</label>
          <select id="course" placeholder="Courses" value={courseValues || ""} onChange={handleCourseChange} required>
            <option>-</option>
            {
              courses && (
                <>
                  {
                    courses.map(item => {
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
        <button onClick={handleAddCourse} style={{marginTop: "16px"}}>Add Course</button>
      </div>
    </div>
  )
}

export default CoursesEdit
