import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ClassesTab from '../components/classes/ClassesTab'
import CoursesTab from '../components/courses/CoursesTab'
import StudentsTab from '../components/students/StudentsTab'

const Dashboard = () => {
  return (
    <div>
      <Switch>
        <Route path='/' component={ClassesTab} exact></Route>
        <Route path='/classes' component={ClassesTab}></Route>
        <Route path='/students' component={StudentsTab}></Route>
        <Route path='/courses' component={CoursesTab}></Route>
      </Switch>
    </div>
  )
}

export default Dashboard
