import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { studentsActions } from '../../store/actions/studentsActions'
import StudentsList from './StudentsList'
import StudentCreate from './StudentCreate'
import StudentEdit from './StudentEdit'
import SingleStudentDetails from './SingleStudentDetails'

const StudentsTab = ()  => {

  const dispatch = useDispatch()
  const students = useSelector((state) => state.studentsReducer.students)

  React.useEffect(() => {
    const fetchCourses = async () => {
      dispatch(await studentsActions.fetchStudents())
    }

    if (!students) {
      fetchCourses()
    }
  }, [dispatch, students])

  return (
    <div className="class">
      <div className="classes__header-container">
        <h1 className="classes__header">Students</h1>
        <Link to="/students/add" className="classes__create-link">
          Create New Student
        </Link>
      </div>
      <Switch>
        <Route path='/students' component={()=><StudentsList courses={students} />} exact></Route>
        <Route path='/students/add' component={StudentCreate} exact></Route>
        <Route path='/students/:id' component={SingleStudentDetails} exact></Route>
        <Route path='/students/:id/edit' component={StudentEdit} exact></Route>
      </Switch>
    </div>
  )
}

export default StudentsTab
