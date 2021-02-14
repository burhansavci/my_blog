import React from "react"
import PropTypes from "prop-types"
import { Footer, Header } from "."
// Styles
import "../styles/blog.css"
import { useLocale } from "../hooks/locale"

const Layout = props => {
  // Using the useLocale() hook to define the correct locale
  // that will be available in all components of the tree thought its context
  const { children, pageContext: { locale } } = props
  const { changeLocale } = useLocale()
  changeLocale(locale)

  return (
    <>
      <div className="viewport">
        <div className="viewport-top">
          <Header />
          <main className="site-main">{children}</main>
        </div>
        <div className="viewport-bottom">
          <Footer />
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
