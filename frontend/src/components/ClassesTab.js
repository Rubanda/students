import React from 'react'
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
    <div>
      <h1>Classes</h1>
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
