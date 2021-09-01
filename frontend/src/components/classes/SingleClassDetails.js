import React from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../utils/api'

function SingleClassDetails() {

  const params = useParams()
  const [classValues, setClassValues] = React.useState(null)
  const [errors, setErrors] = React.useState(null)

  React.useEffect(() => {
    if (!classValues) {
      api.get(`/api/classes/${params.id}`)
      .then(response => {
        setClassValues({...response.data})
      })
      .catch(error => {
        console.log("Error fetching class")
        setErrors(error?.response?.data)
      })
    }
  }, [params.id, classValues])

  return (
    <div className="details-card">
      {errors && <div className="error">{ errors?.message }</div>}
      {
        classValues
          ?
          (
            <div>
              <div className="details-card__name">
                <p><strong>Name:</strong> {classValues.name}</p>
              </div>
              <div className="details-card__age">
                <p><strong>Number of Students:</strong> {classValues.students?.length}</p>
              </div>
              <div style={{ marginTop: "15px" }}>
                <div>
                  <h6 style={{ fontSize: "28px", fontWeight: 700, }}>Students</h6>
                  {/* <button onClick={handleAddStudent}>Add Student</button> */}
                </div>
                <div calssName="details-card__link">
                  {
                    classValues?.students?.length > 0
                      ?
                      (
                        <>
                          {classValues.students.map(item => {
                            return (
                              <div  key={item.id}>
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
                          <p>No students in this class</p>
                        </div>
                      )
                  }
                </div>
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

export default SingleClassDetails
