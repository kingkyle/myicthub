import React from "react"
import Post from "../Post"
import { useStaticQuery, graphql } from "gatsby"
import PaginationLinks from "../PaginationLinks"

const LatestPosts = () => {
  const posts = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 10
      ) {
        totalCount
        edges {
          node {
            id
            excerpt
            timeToRead
            frontmatter {
              title
              date
              categories
              image {
                childImageSharp {
                  fluid(maxWidth: 200) {
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
  const postPerPage = 10
  const numberOfPages = Math.ceil(
    posts.allMarkdownRemark.totalCount / postPerPage
  )
  return (
    <>
      <h2 className="line-text">Latest Posts</h2>
      {posts.allMarkdownRemark.edges.map(({ node }) => (
        <Post
          title={node.frontmatter.title}
          time={node.timeToRead}
          excerpt={node.excerpt}
          key={node.id}
          categories={node.frontmatter.categories}
          fluid={node.frontmatter.image.childImageSharp.fluid}
          slug={node.fields.slug}
        />
      ))}
      {numberOfPages > 1 && (
        <PaginationLinks currentPage={1} numberOfPages={numberOfPages} />
      )}
    </>
  )
}

export default LatestPosts
