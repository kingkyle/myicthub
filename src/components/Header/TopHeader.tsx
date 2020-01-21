import React from "react"
import { FaSearch, FaShareAlt } from "react-icons/fa"
import { Link } from "gatsby"

const TopHeader = ({ siteTitle, slogan }) => {
  return (
    <div className="top-header">
      <div className="search">
        <FaSearch size={20} />
      </div>
      <div className="site-title">
        <Link to="/">
          <h1 className="font-cursive">{siteTitle}</h1>
        </Link>
        <p className="font-cursive">{slogan}</p>
      </div>
      <div className="share">
        <FaShareAlt size={20} />
      </div>
    </div>
  )
}

export default TopHeader
