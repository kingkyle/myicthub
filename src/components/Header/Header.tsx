import PropTypes from "prop-types"
import React from "react"
import TopHeader from "./TopHeader"
import MainNav from "./MainNav"

const Header = ({ siteTitle, slogan }) => {
  return (
    <header>
      <TopHeader siteTitle={siteTitle} slogan={slogan} />
      <MainNav />
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
