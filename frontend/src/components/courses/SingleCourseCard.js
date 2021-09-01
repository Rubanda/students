import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import { coursesActions } from '../../store/actions/coursesActions';

const SingleCourseCard = ({ singleCourse }) => {

  const [loading, setLoading] = React.useState(false);

  const history = useHistory()

  const dispatch = useDispatch()

  const handleDelete = async () => {
    setLoading(true)

    await coursesActions.deleteCourse(singleCourse.id, dispatch)
  }

  const handleEdit = () => {
    history.push(`/courses/${singleCourse.id}/edit`)
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
      <div className="single-class-card__layouts" >
        <div className="single-class-card__link">
          <Link style={{ textDecoration: 'none' }} to={`/courses/${singleCourse.id}`}>{singleCourse.name}</Link>
        </div>
      
        <div className="single-class-card__btn" >
          <button className="single-class-card__action-button" onClick={handleEdit}>Edit</button>
          <button className="single-class-card__action-button-delete" disabled={loading} onClick={handleDelete}>{loading ? "Deleting..." : "Delete"}</button>
        </div>
        </div>
    </div>
  )
}

export default SingleCourseCard
