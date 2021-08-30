import React from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { classesActions } from '../store/actions/classesActions'
import SingleClassCard from './SingleClassCard'

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
      {
        classes
          ?
          (
            classes.map(item => {
              return (
                <React.Fragment key={item.id}>
                  <SingleClassCard singleClass={item} />
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

export default ClassesTab
