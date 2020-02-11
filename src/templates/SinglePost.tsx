import React from "react"
import MainLayout from "../components/MainLayout"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Share from "../components/Share/Share"
import SEO from "../components/seo"
import { slugify } from "../utils/utilities"
import Disqus from "../components/Comments/Disqus"

const SinglePost = ({ data }) => {
  return (
    <MainLayout>
      <SEO
        title={data.markdownRemark.frontmatter.title}
        description={data.markdownRemark.excerpt}
      />
      <div className="single-post">
        <div className="category">
          <ul className="list-category">
            {data.markdownRemark.frontmatter.categories.map(
              (category: string) => (
                <li key={slugify(category)}>
                  <Link to={`/category/${slugify(category)}`}>{category}</Link>
                </li>
              )
            )}
          </ul>
        </div>
        <h1
          className="post-title font-cursive"
          title={`viewing post titled "${data.markdownRemark.frontmatter.title}"`}
        >
          {data.markdownRemark.frontmatter.title}
        </h1>
        <p className="post-author">{data.markdownRemark.frontmatter.author} </p>
        <p className="post-read-time">
          {data.markdownRemark.timeToRead} mins Read
        </p>
        <Share
          socialConfig={{
            twitterHandle: data.site.siteMetadata.twitterHandle,
            config: {
              url: `${data.site.siteMetadata.url}/${data.markdownRemark.fields.slug}`,
              title: data.markdownRemark.frontmatter.title,
            },
          }}
          tags={data.markdownRemark.frontmatter.keywords}
        />
        <div className="post-content">
          <Img
            fluid={data.markdownRemark.frontmatter.image.childImageSharp.fluid}
          />
          <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
        </div>
        <Share
          socialConfig={{
            twitterHandle: data.site.siteMetadata.twitterHandle,
            config: {
              url: `${data.site.siteMetadata.url}/${data.markdownRemark.fields.slug}`,
              title: data.markdownRemark.frontmatter.title,
            },
          }}
          tags={data.markdownRemark.frontmatter.keywords}
        />
        <Disqus
          title={data.markdownRemark.frontmatter.title}
          identifier={data.markdownRemark.id}
          slug={data.markdownRemark.fields.slug}
        />
      </div>
    </MainLayout>
  )
}

export const postQuery = graphql`
  query singlePostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      excerpt
      frontmatter {
        title
        categories
        keywords
        author
        image {
          childImageSharp {
            fluid(maxWidth: 830) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      fields {
        slug
      }
    }
    site {
      siteMetadata {
        twitterHandle
        url
      }
    }
  }
`

export default SinglePost
