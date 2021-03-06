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
    <div className="details-card">
      {errors && <div className="error">{ errors?.message }</div>}
      {
        values
          ?
          (
            <div className="details-card__layout">
              <div className="details-card__name">
                <p><strong>Name:</strong> {values.name}</p>
              </div>
              <div calssName="links">
                  <h6 style={{ fontSize: "28px", fontWeight: 700, }}>Students</h6>  
                <div className="details-card__students-name">
                  {
                    values?.students?.length > 0
                      ?
                      (
                        <>
                          {values.students.map(item => {
                            return (
                              <div key={item.id}>
                                <Link style={{ textDecoration: 'none' }} to={`/students/${item.id}`}>
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
              <div className="details-card__button-link">
                <Link style={{textDecoration: "none", color: 'white'}} to={`/courses/${values.id}/edit`}>Edit Course</Link>
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
