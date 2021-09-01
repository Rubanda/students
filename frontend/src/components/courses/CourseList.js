import React from 'react'
import SingleCourseCard from './SingleCourseCard'

const CourseList = ({ courses }) => {
  
  return (
    <div className="background-card" >
      {
        courses
          ?
          (
            courses.map(item => {
              return (
                <React.Fragment key={item.id}>
                  <SingleCourseCard singleCourse={item} />
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

export default CourseList
