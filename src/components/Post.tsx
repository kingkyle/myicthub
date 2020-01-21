import React from "react"
import Img from "gatsby-image"
import { Link } from "gatsby"
import { slugify } from "../utils/utilities"

const Post = ({ title, categories, fluid, time, excerpt, slug }: any) => {
  return (
    <div className="post-card">
      <Link to={`/${slug}`}>
        <Img fluid={fluid} className="post-image" />
      </Link>
      <div className="post">
        <div className="category">
          <ul className="list-category">
            {categories.map((category: string) => (
              <li key={slugify(category)}>
                <Link to={`/category/${slugify(category)}`}>{category}</Link>
              </li>
            ))}
          </ul>
        </div>
        <h2 className="text-capitalize font-cursive">
          <Link to={`/${slug}`}>{title}</Link>
        </h2>
        <p className="text-small">{time} mins Read</p>
        <p className="post-text">{excerpt}</p>
      </div>
    </div>
  )
}

export default Post
