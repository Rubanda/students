import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import { studentsActions } from '../../store/actions/studentsActions';

const SingleStudentCard = ({ student }) => {
  const [loading, setLoading] = React.useState(false);

  const history = useHistory()

  const dispatch = useDispatch()

  const handleDelete = async () => {
    setLoading(true)

    await studentsActions.deleteStudents(student.id, dispatch)
  }

  const handleEdit = () => {
    history.push(`/students/${student.id}/edit`)
  }

  React.useEffect(() => {
    return () => {
      if (loading) {
        setLoading(false)
      }
    }
  }, [loading])
  return (
    <div>
      <div className="single-class-card">
      <Link to={`/students/${student.id}`}>{student.name}</Link>
      <p>{student.age}</p>
        <p>{student.class?.name}</p>
      </div>
      <div>
          <button className="single-class-card__action-button" onClick={handleEdit}>Edit</button>
          <button className="single-class-card__action-button" disabled={loading} onClick={handleDelete}>{loading ? "Deleting..." : "Delete"}</button>
        </div>
    </div>
  )
}

export default SingleStudentCard
