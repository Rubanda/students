import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ClassesTab from '../components/ClassesTab'
import CoursesTab from '../components/CoursesTab'
import StudentsTab from '../components/StudentsTab'

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <div>
        <Switch>
          <Route path='/' component={ClassesTab} exact></Route>
          <Route path='/classes' component={ClassesTab} exact></Route>
          <Route path='/classes/:id' component={ClassesTab} exact></Route>
          <Route path='/students' component={StudentsTab} exact></Route>
          <Route path='/students/:id' component={StudentsTab} exact></Route>
          <Route path='/courses' component={CoursesTab} exact></Route>
          <Route path='/courses/:id' component={CoursesTab} exact></Route>
        </Switch>
      </div>
    </div>
  )
}

export default Dashboard
