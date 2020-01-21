import React from "react"
import Layout from "../components/layout"
import SidebarIndex from "../components/Sidebars/SidebarIndex"
import Post from "../components/Post"
import { graphql } from "gatsby"
import PaginationLinks from "../components/PaginationLinks"

const PostList = (props: any) => {
  const posts = props.data.allMarkdownRemark.edges
  const { currentPage, numberOfPages } = props.pageContext
  return (
    <Layout>
      <div className="index-col">
        <div className="posts-area">
          <h2 className="line-text">Latest Posts</h2>
          {posts.map(({ node }) => (
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
          <PaginationLinks
            currentPage={currentPage}
            numberOfPages={numberOfPages}
          />
        </div>
        <div className="sidebar-area">
          <SidebarIndex />
        </div>
      </div>
    </Layout>
  )
}

export const postListQuery = graphql`
  query postListQuery($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
`

export default PostList
