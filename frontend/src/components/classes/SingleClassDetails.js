import React from 'react'
import { useParams } from 'react-router-dom'
import api from '../../utils/api'

function SingleClassDetails() {

  const params = useParams()
  const [values, setValues] = React.useState(null)
  const [errors, setErrors] = React.useState(null)

  React.useEffect(() => {
    if (!values) {
      api.get(`/api/classes/${params.id}`)
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
                <p>Name: </p>{values.name}
              </div>
              <div>
                <p>Number: </p>{values.students?.length}
              </div>
              <div>
                <h6>Students</h6>
                <div>
                  {
                    values.students.map(item => {
                      return (
                        <React.Fragment key={item.id}>
                          {item.name}
                        </React.Fragment>
                      )
                    })
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
