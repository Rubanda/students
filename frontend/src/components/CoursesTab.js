import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { coursesActions } from '../store/actions/coursesActions'
import SingleCourseCard from './SingleCourseCard'

function CoursesTab() {

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
    <div>
      <h1>Courses</h1>
      {
        courses
          ?
          (
            courses.map(item => {
              return (
                <React.Fragment key={item.id}>
                  <SingleCourseCard course={item} />
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

export default CoursesTab
