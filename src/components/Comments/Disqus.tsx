import React from "react"
import { DiscussionEmbed } from "disqus-react"
import { useStaticQuery, graphql } from "gatsby"

const Disqus = ({ identifier, title, slug }) => {
  const data = useStaticQuery(graphql`
    query SiteUrlQuery {
      site {
        siteMetadata {
          url
        }
      }
    }
  `)
  const baseUrl = data.site.siteMetadata.url
  const disqusShortname = "myicthub"
  const disqusConfig = {
    identifier,
    title,
    url: baseUrl + "/" + slug,
  }
  return (
    <div className="disqus-section">
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  )
}

export default Disqus
