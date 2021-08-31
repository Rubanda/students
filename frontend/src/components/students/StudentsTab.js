import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { studentsActions } from '../../store/actions/studentsActions'
import SingleStudentCard from './SingleStudentCard'

function StudentsTab() {

  const dispatch = useDispatch()
  const students = useSelector((state) => state.studentsReducer.students)

  React.useEffect(() => {
    const fetchStudents = async () => {
      dispatch(await studentsActions.fetchStudents())
    }

    if (!students) {
      fetchStudents()
    }
  }, [dispatch, students])

  return (
    <div>
      <h1>Students</h1>
      {
        students
          ?
          (
            students.map(item => {
              return (
                <React.Fragment key={item.id}>
                  <SingleStudentCard student={item} />
                </React.Fragment>
              )
            })
          )
          :
          (
            <div>
              Loading...
            </div>
          )
      }
    </div>
  )
}

export default StudentsTab
