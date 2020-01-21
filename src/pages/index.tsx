import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Slider from "../components/Slider/Slider"
import CheckOut from "../components/Index/CheckOut"
import LatestPosts from "../components/Index/LatestPosts"
import SidebarIndex from "../components/Sidebars/SidebarIndex"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Slider />
    <CheckOut />
    <div className="index-col">
      <div className="posts-area">
        <LatestPosts />
      </div>
      <div className="sidebar-area">
        <SidebarIndex />
      </div>
    </div>
  </Layout>
)

export default IndexPage
