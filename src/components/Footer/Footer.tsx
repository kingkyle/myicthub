import React from "react"
import { Link } from "gatsby"

const Footer = () => {
  return (
    <div className="footer">
      <div className="main-container text-center">
        <p>
          &copy; {new Date().getFullYear()} - <Link to="/">MyICTHub</Link>
        </p>
      </div>
    </div>
  )
}

export default Footer
