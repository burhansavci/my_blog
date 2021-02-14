import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { LocalizedLink, Navigation, useNavigation, LanguageSwitcher } from "."
import React from "react"
import { useHome } from "../hooks/home"

const Header = () => {

  const { isHome } = useHome()
  const navigations = useNavigation()

  const data = useStaticQuery(query)
  const { siteMetadata } = data.site
  const githubUrl = siteMetadata.github ? `https://github.com/${siteMetadata.github.replace(/^@/, ``)}` : null
  const linkedinUrl = siteMetadata.linkedin ? `  https://www.linkedin.com/in/${siteMetadata.linkedin.replace(/^@/, ``)}` : null
  return (
    <header className="site-head"
            style={{ ...data.coverImage.childImageSharp.fixed.src && { backgroundImage: `url(${data.coverImage.childImageSharp.fixed.src})` } }}>
      <div className="container">

        <div className="site-mast">

          <div className="site-mast-left">
            <LocalizedLink to="/">
              <Img fixed={data.logo.childImageSharp.fixed} alt={siteMetadata.title} />
            </LocalizedLink>
            <LanguageSwitcher />
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
            <Navigation data={navigations} />
          </div>
        </nav>

      </div>
    </header>

  )
}
const query = graphql`
    query HeaderQuery {
        site {
            siteMetadata {
                title
                author
                description
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
`
export default Header
