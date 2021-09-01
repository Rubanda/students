import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { coursesActions } from '../../store/actions/coursesActions'
import CourseList from './CourseList'
import CoursesCreate from './CourseCreate'
import CoursesEdit from './CoursesEdit'
import SingleCoursesDetails from './SingleCoursesDetails'

const CoursesTab = ()  => {

  const dispatch = useDispatch()
  const courses = useSelector((state) => state.coursesReducer.courses)

  React.useEffect(() => {
    const fetchCourses = async () => {
      dispatch(await coursesActions.fetchCourses())
    }

    if (!courses) {
      fetchCourses()
    }
  }, [dispatch, courses])

  return (
    <div className="classes__header-container">
      <div className="classes__layouts">
        <div className="classes__create-h1">
          <h1 >Course</h1>
        </div>
        <div className="classes__create-link">
          <Link style={{ textDecoration: 'none',color: 'white' }} to="/courses/add">Create New Course</Link>
        </div>
      </div>
      <Switch>
        <Route path='/courses' component={()=><CourseList courses={courses} />} exact></Route>
        <Route path='/courses/add' component={CoursesCreate} exact></Route>
        <Route path='/courses/:id' component={SingleCoursesDetails} exact></Route>
        <Route path='/courses/:id/edit' component={CoursesEdit} exact></Route>

      </Switch>
      
    </div>
  )
}

export default CoursesTab
