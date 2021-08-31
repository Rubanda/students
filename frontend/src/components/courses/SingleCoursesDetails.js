import React from 'react'
import { Link, useParams } from 'react-router-dom'
import api from '../../utils/api'

function SingleCoursesDetails() {

  const params = useParams()
  const [values, setValues] = React.useState(null)
  const [errors, setErrors] = React.useState(null)

  React.useEffect(() => {
    if (!values) {
      api.get(`/api/courses/${params.id}`)
      .then(response => {
        setValues({...response.data})
      })
      .catch(error => {
        console.log("Error fetching class")
        setErrors(error?.response?.data)
      })
    }
  }, [params.id, values])

  return (
    <div>
      {errors && <div className="error">{ errors?.message }</div>}
      {
        values
          ?
          (
            <div>
              <div>
                <p><strong>Name:</strong> {values.name}</p>
              </div>
              <div style={{ marginTop: "15px" }}>
                <div>
                  <h6 style={{ fontSize: "16px" }}>Students</h6>
                </div>
                <div>
                  {
                    values?.students?.length > 0
                      ?
                      (
                        <>
                          {values.students.map(item => {
                            return (
                              <div key={item.id}>
                                <Link to={`/students/${item.id}`}>
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
                <Link to={`/courses/${values.id}/edit`}>Edit Course</Link>
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

export default SingleCoursesDetails
