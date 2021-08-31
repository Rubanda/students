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
    <div className="class">
      <div className="classes__header-container">
        <h1 className="classes__header">Course</h1>
        <Link to="/courses/add" className="classes__create-link">
          <button className="classes__create-link__button">Create New Course
          </button></Link>
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
