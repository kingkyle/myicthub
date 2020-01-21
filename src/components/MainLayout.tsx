import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./Header/Header"
import "./layout.scss"
import SidebarMain from "./Sidebars/SidebarMain"
import Footer from "./Footer/Footer"

const MainLayout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery2 {
      site {
        siteMetadata {
          title
          slogan
        }
      }
    }
  `)

  return (
    <>
      <Header
        siteTitle={data.site.siteMetadata.title}
        slogan={data.site.siteMetadata.slogan}
      />
      <div className="main-container">
        <main>
          <div className="index-col">
            <div className="main">{children}</div>
            <div className="sidebar-main">
              <SidebarMain />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainLayout
