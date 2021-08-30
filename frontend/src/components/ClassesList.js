import React from 'react'
import SingleClassCard from './SingleClassCard'

const ClassesList = ({ classes }) => {
  
  return (
    <div>
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

export default ClassesList
