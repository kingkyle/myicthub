import React from "react"
import { Link } from "gatsby"

const MainNav = () => {
  return (
    <div className="main-nav">
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <Link to="/category/mobile">Mobile</Link>
          </li>
          <li>
            <Link to="/category/gaming">Gaming</Link>
          </li>
          <li>
            <Link to="/category/miscellaneous">Miscellaneous</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default MainNav
