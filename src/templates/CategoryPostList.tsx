import React from "react"
import Layout from "../components/layout"
import SidebarIndex from "../components/Sidebars/SidebarIndex"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Post from "../components/Post"
import PaginationLinks from "../components/PaginationLinks"

const CategoryPostList = (props: any) => {
  const { category, numberOfPages, currentPage } = props.pageContext
  const posts = props.data.allMarkdownRemark.edges
  const totalCount = props.data.allMarkdownRemark.totalCount
  return (
    <Layout>
      <SEO title={category} />
      <div className="category-title">
        <p className="text-capitalize category-name font-cursive">{category}</p>
      </div>
      <div className="index-col">
        <div className="posts-area">
          <h2 className="line-text text-capitalize">&nbsp;</h2>
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
          {numberOfPages > 1 && (
            <PaginationLinks
              currentPage={currentPage}
              numberOfPages={numberOfPages}
            />
          )}
        </div>
        <div className="sidebar-area">
          <SidebarIndex />
        </div>
      </div>
    </Layout>
  )
}

export const categoryPostsQuery = graphql`
  query categoryPostsQuery($category: String!, $limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
      limit: $limit
      skip: $skip
    ) {
      totalCount
      edges {
        node {
          id
          excerpt
          timeToRead
          frontmatter {
            title
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

export default CategoryPostList
