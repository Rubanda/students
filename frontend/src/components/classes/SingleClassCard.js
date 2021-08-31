import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import { classesActions } from '../../store/actions/classesActions';

const SingleClassCard = ({ singleClass }) => {

  const [loading, setLoading] = React.useState(false);

  const history = useHistory()

  const dispatch = useDispatch()

  const handleDelete = async () => {
    setLoading(true)

    await classesActions.deleteClass(singleClass.id, dispatch)
  }

  const handleEdit = () => {
    history.push(`/classes/${singleClass.id}/edit`)
  }

  React.useEffect(() => {
    return () => {
      if (loading) {
        setLoading(false)
      }
    }
  }, [loading])
  
  return (
    <div className="single-class-card">
      <Link to={`/classes/${singleClass.id}`}>{singleClass.name}</Link>
      <div>
        <button className="single-class-card__action-button" onClick={handleEdit}>Edit</button>
        <button className="single-class-card__action-button" disabled={loading} onClick={handleDelete}>{loading ? "Deleting..." : "Delete"}</button>
      </div>
    </div>
  )
}

export default SingleClassCard
