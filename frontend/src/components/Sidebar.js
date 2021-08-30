import React from 'react'
import { Link } from "react-router-dom";

export default function Sidebar() {

  return (
    <div className='sidebar'>
      <div className='sidebar-menu'>
        <div>
          <img
            src="https://neu.edu.tr/wp-content/uploads/2020/12/14/gunsel_logo.jpg"
            width="100px"
            height="100px"
            alt="Gunsel logo"
          />
        </div>
        <div>
          <Link to='/classes'><h2>Classes</h2></Link>
        </div>
        <div>
          <Link to='/students'><h2>Student</h2></Link>
        </div>
        <div>
          <Link to='/courses'><h2>Course</h2></Link>
        </div>
      </div>
    </div>
  )
}
