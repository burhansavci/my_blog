import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { LocalizedLink, Navigation, useNavigation, LanguageSwitcher, useTranslations } from "."
import React from "react"
import { useHome } from "../hooks/home"
import BackgroundImage from "gatsby-background-image"

const Header = () => {

  const { isHome } = useHome()
  const navigations = useNavigation()
  const { siteTitle, siteDescription } = useTranslations()

  const data = useStaticQuery(query)
  const { siteMetadata } = data.site
  const githubUrl = siteMetadata.github ? `https://github.com/${siteMetadata.github.replace(/^@/, ``)}` : null
  const linkedinUrl = siteMetadata.linkedin ? `  https://www.linkedin.com/in/${siteMetadata.linkedin.replace(/^@/, ``)}` : null
  return (
    <BackgroundImage Tag={`header`} className="site-head" fluid={data.coverImage.childImageSharp.fluid} tag>
      <div className="container">

        <div className="site-mast">

          <div className="site-mast-left">
            <LocalizedLink to="/">
              <Img fixed={data.logo.childImageSharp.fixed} alt={siteTitle} />
            </LocalizedLink>
            <LanguageSwitcher />
          </div>

          <div className="site-mast-right">
            {siteMetadata.github && <a href={githubUrl} className="site-nav-icon-item" target="_blank"
                                       rel="noopener noreferrer"><img className="site-nav-icon"
                                                                      width="15px"
                                                                      height="15px"
                                                                      src="/images/icons/github.svg"
                                                                      alt="Github" /></a>}
            {siteMetadata.linkedin && <a href={linkedinUrl} className="site-nav-icon-item" target="_blank"
                                         rel="noopener noreferrer"><img className="site-nav-icon"
                                                                        width="15px"
                                                                        height="15px"
                                                                        src="/images/icons/linkedin.svg"
                                                                        alt="Linkedin" /></a>}
          </div>

        </div>

        {isHome ? (
          <div className="site-banner">
            <h1 className="site-banner-title">{siteTitle}</h1>
            <p className="site-banner-desc">{siteDescription}</p>
          </div>
        ) : null}

        <nav className="site-nav">
          <div className="site-nav-left">
            <Navigation data={navigations} />
          </div>
        </nav>

      </div>
    </BackgroundImage>
  )
}
const query = graphql`
    query HeaderQuery {
        site {
            siteMetadata {
                author
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
                fluid(maxWidth: 2000, maxHeight: 666) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`
export default Header
