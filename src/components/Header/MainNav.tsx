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
            <a href="/category/mobile">Mobile</a>
          </li>
          <li>
            <a href="/category/gaming">Gaming</a>
          </li>
          <li>
            <a href="/category/miscellaneous">Miscellaneous</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default MainNav
