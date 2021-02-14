import { graphql, useStaticQuery } from "gatsby"
import { LocalizedLink, Navigation, useNavigation } from "."
import React from "react"

const Footer = () => {
  const data = useStaticQuery(query)
  const { siteMetadata } = data.site
  const navigations = useNavigation()

  return (
    <footer className="site-foot">
      <div className="site-foot-nav container">
        <div className="site-foot-nav-left">
          <LocalizedLink to="/">{siteMetadata.title}</LocalizedLink> © 2021
        </div>
        <div className="site-foot-nav-right">
          <Navigation data={navigations} navClass="site-nav-item" />
        </div>
      </div>
    </footer>
  )
}
const query = graphql`
    query FooterQuery {
        site {
            siteMetadata {
                title
            }
        }
    }
`
export default Footer
