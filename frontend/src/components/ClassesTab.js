import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { classesActions } from '../store/actions/classesActions'
import ClassesList from './ClassesList'
import ClassesCreate from './ClassesCreate'
import SingleClassDetails from './SingleClassDetails'
import ClassesEdit from './ClassesEdit'

function ClassesTab() {

  const dispatch = useDispatch()
  const classes = useSelector((state) => state.classesReducer.classes)

  React.useEffect(() => {
    const fetchClasses = async () => {
      dispatch(await classesActions.fetchClasses())
    }

    if (!classes) {
      fetchClasses()
    }
  }, [dispatch, classes])

  return (
    <div className="classes">
      <div className="classes__header-container">
        <h1 className="classes__header">Classes</h1>
        <Link to="/classes/add" className="classes__create-link">Create New Class</Link>
      </div>
      <Switch>
        <Route path='/classes/' component={() => <ClassesList classes={classes} />} exact></Route>
        <Route path='/classes/add' component={ClassesCreate} exact></Route>
        <Route path='/classes/:id' component={SingleClassDetails} exact></Route>
        <Route path='/classes/:id/edit' component={ClassesEdit} exact></Route>
      </Switch>
    </div>
  )
}

export default ClassesTab
