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
    <div className="single-student-card" >
      <div className="single-student-card__layouts">
        <div className="single-student-card__link">
          <Link style={{ textDecoration: 'none' }} to={`/students/${student.id}`}>{student.name}</Link>
        </div>
        <div className="single-student-card__btns">
          <button className="single-student-card__action-button" onClick={handleEdit}>Edit</button>
          <button className="single-student-card__action-button-delete" disabled={loading} onClick={handleDelete}>{loading ? "Deleting..." : "Delete"}</button>
        </div>
      </div>
    </div>
  )
}

export default SingleStudentCard
