import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import BackgroundImage from "gatsby-background-image"

const CheckOut = () => {
  const posts = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { featured: { eq: true } } }
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 6
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              image {
                childImageSharp {
                  fluid(maxWidth: 400) {
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
    <>
      <h2 className="line-text">Check This Out</h2>
      <div className="checkout-posts">
        {posts.allMarkdownRemark.edges.map(({ node }) => (
          <BackgroundImage
            className="featured-post"
            fluid={node.frontmatter.image.childImageSharp.fluid}
            key={node.id}
            style={{ borderRadius: "10px" }}
          >
            <h1 className="font-cursive text-capitalize">
              <Link to={`/${node.fields.slug}`}>{node.frontmatter.title}</Link>
            </h1>
          </BackgroundImage>
        ))}
      </div>
    </>
  )
}

export default CheckOut
