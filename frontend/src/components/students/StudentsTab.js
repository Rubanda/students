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
    <div className="classes__header-container">
      <div className="classes__layouts">
        <div className="classes__create-h1">
          <h1 >Students</h1>
        </div>
        <div className="classes__create-link    ">
        <Link style={{ textDecoration: 'none' }} to="/students/add">
          Create New Student
        </Link>
        </div>
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
