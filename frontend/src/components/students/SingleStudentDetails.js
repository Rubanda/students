import React from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../utils/api'

function SingleStudentDetails() {

  const params = useParams()
  const [studentValues, setStudentValues] = React.useState(null)
  const [errors, setErrors] = React.useState(null)

  React.useEffect(() => {
    if (!studentValues) {
      api.get(`/api/students/${params.id}`)
      .then(response => {
        setStudentValues({...response.data})
      })
      .catch(error => {
        console.log("Error fetching class")
        setErrors(error?.response?.data)
      })
    }
  }, [params.id, studentValues])

  return (
    <div>
      {errors && <div className="error">{ errors?.message }</div>}
      {
        studentValues
          ?
          (
            <div>
              <div>
                <p><strong>Name:</strong> {studentValues.name}</p>
              </div>
              <div>
                <p><strong>Age:</strong> {studentValues.age || "- -"}</p>
              </div>
              <div>
                <p><strong>Class:</strong> { studentValues.class ? <Link to={`/classes/${studentValues.class_id}`}>{studentValues.class?.name}</Link> : "- -" }</p>
              </div>
              <div style={{ marginTop: "15px" }}>
                <div>
                  <h6 style={{ fontSize: "16px" }}>Courses</h6>
                  {/* <button onClick={handleAddStudent}>Edit Student Courses</button> */}
                </div>
                <div>
                  {
                    studentValues?.courses?.length > 0
                      ?
                      (
                        <>
                          {studentValues.courses.map(item => {
                            return (
                              <div key={item.id}>
                                <Link to={`/courses/${item.id}`}>
                                  {item.name}
                                </Link>
                              </div>
                            )
                          })}
                        </>
                      )
                      :
                      (
                        <div>
                          <p>No courses for this student</p>
                        </div>
                      )
                  }
                </div>
              </div>
              <div style={{ marginTop: "10px"}}>
                <Link to={`/students/${studentValues.id}/edit`}>Edit Student</Link>
              </div>
            </div>
          )
            :
          (
            <div>Loading...</div>
          )
      }
    </div>
  )
}

export default SingleStudentDetails
