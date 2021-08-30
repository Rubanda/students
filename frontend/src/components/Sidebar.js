import React from 'react'
import { Link, useHistory } from "react-router-dom";

export default function Sidebar() {

  const history = useHistory()

  return (
    <div className='sidebar'>
      <div className='sidebar__menu'>
        <div className="sidebar__logo-container">
          <img
            src="https://neu.edu.tr/wp-content/uploads/2020/12/14/gunsel_logo.jpg"
            width="100px"
            height="100px"
            alt="Gunsel logo"
            className="sidebar__logo"
          />
        </div>
        <div>
          <div className="sidebar__menu-link-container">
            <Link to='/classes' className="sidebar__menu-link"><h2>Classes</h2></Link>
          </div>
          <div className="sidebar__menu-link-container">
            <Link to='/students' className="sidebar__menu-link"><h2>Student</h2></Link>
          </div>
          <div className="sidebar__menu-link-container">
            <Link to='/courses' className="sidebar__menu-link"><h2>Course</h2></Link>
          </div>
        </div>
      </div>
    </div>
  )
}
