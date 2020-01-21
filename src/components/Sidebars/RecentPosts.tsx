import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

const RecentPosts = () => {
  const posts = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 5
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              image {
                childImageSharp {
                  fluid(maxWidth: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  return (
    <div className="sidebar-posts">
      <h2 className="font-cursive heading">Recent Posts</h2>
      {posts.allMarkdownRemark.edges.map(({ node }) => (
        <div className="post" key={node.id}>
          <Link to={`/${node.fields.slug}`}>
            <Img
              fluid={node.frontmatter.image.childImageSharp.fluid}
              className="post-image"
            />
          </Link>
          <p className="title font-normal">
            <Link to={`/${node.fields.slug}`}>{node.frontmatter.title}</Link>
          </p>
        </div>
      ))}
    </div>
  )
}

export default RecentPosts
