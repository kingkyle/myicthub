import React from "react"
import { Link } from "gatsby"

const TopHeader = ({ siteTitle, slogan }) => {
  return (
    <div className="top-header">
      <div className="search">&nbsp;</div>
      <div className="site-title">
        <Link to="/">
          <h1 className="font-cursive">{siteTitle}</h1>
        </Link>
        <p className="font-cursive">{slogan}</p>
      </div>
      <div className="share">&nbsp;</div>
    </div>
  )
}

export default TopHeader
