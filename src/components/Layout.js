import React from "react"
import PropTypes from "prop-types"
import { graphql, StaticQuery, Link } from "gatsby"
import Img from "gatsby-image"
import { Navigation } from '.'
// Styles
import "../styles/blog.css"

const Layout = ({ data, children, isHome }) => {
  const { siteMetadata } = data.site
  const githubUrl = siteMetadata.github ? `https://github.com/${siteMetadata.github.replace(/^@/, ``)}` : null
  const linkedinUrl = siteMetadata.linkedin ? `  https://www.linkedin.com/in/${siteMetadata.linkedin.replace(/^@/, ``)}` : null

  return (
    <>
      <div className="viewport">
        <div className="viewport-top">
          <header className="site-head"
                  style={{ ...data.coverImage.childImageSharp.fixed.src && { backgroundImage: `url(${data.coverImage.childImageSharp.fixed.src})` } }}>
            <div className="container">

              <div className="site-mast">

                <div className="site-mast-left">
                  <Link to="/">
                    <Img fixed={data.logo.childImageSharp.fixed} alt={siteMetadata.title} />
                  </Link>
                </div>

                <div className="site-mast-right">
                  {siteMetadata.github && <a href={githubUrl} className="site-nav-icon-item" target="_blank"
                                             rel="noopener noreferrer"><img className="site-nav-icon"
                                                                            src="/images/icons/github.svg"
                                                                            alt="Github" /></a>}
                  {siteMetadata.linkedin && <a href={linkedinUrl} className="site-nav-icon-item" target="_blank"
                                               rel="noopener noreferrer"><img className="site-nav-icon"
                                                                              src="/images/icons/linkedin.svg"
                                                                              alt="Linkedin" /></a>}
                </div>

              </div>

              {isHome ? (
                <div className="site-banner">
                  <h1 className="site-banner-title">{siteMetadata.title}</h1>
                  <p className="site-banner-desc">{siteMetadata.description}</p>
                </div>
              ) : null}

              <nav className="site-nav">
                <div className="site-nav-left">
                  <Navigation data={siteMetadata.navigation} />
                </div>
              </nav>

            </div>
          </header>

          <main className="site-main">{children}</main>
        </div>

        <div className="viewport-bottom">
          <footer className="site-foot">
            <div className="site-foot-nav container">
              <div className="site-nav-left">
                <Navigation data={siteMetadata.navigation} navClass="site-nav-item" />
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

const LayoutSettingsQuery = props => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            author
            description
            navigation {
              label
              url
            }
            github
            linkedin
          }
        }
        logo: file(relativePath: { eq: "icon.png" }) {
          childImageSharp {
            fixed(width: 30, height: 30) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        coverImage: file(relativePath: { eq: "cover-image.png" }) {
          childImageSharp {
            fixed(width: 2000, height: 666) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => <Layout data={data} {...props} />}
  />
)


export default LayoutSettingsQuery
