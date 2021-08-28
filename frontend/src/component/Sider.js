import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { classActions } from '../actions/classActions';
import { Link } from "react-router-dom";
import '../App.css'
import Loading from './Loading';
import Message from './Message';


export default function Sider() {

  const dispatch = useDispatch()

  const classs = useSelector(state => state.class)
  console.log(classs)
  const { loading, error, data } = classs

  console.log(data)

  useEffect(() => {
    dispatch(classActions())
  }, [dispatch])

  return (
    <div className='sider'>
      <div>
        <Link to='/class'><h2>classes</h2></Link>
      {loading ? <Loading></Loading>
        : error ? <Message>{error}</Message> :
          (
            <>
              <ul>
                {data.map(list => (
                  <li key={list._id}>
                    {list.name}
                  </li>
                ))}
              </ul>
            </>
      )
        }
      </div>
      <div>
        <Link to='/student'><h2>Student</h2></Link>

      </div>
      <div>
        <Link to='/course'><h2>Course</h2></Link>
      </div>
    </div>
  )
}
