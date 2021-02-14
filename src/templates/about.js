import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { PostCard, Pagination, useTranslations } from "../components"
import { useHome } from "../hooks/home"

const About = ({ data, pageContext }) => {
  const { site, allMarkdownRemark, profileImage } = data
  const { siteMetadata } = site
  const githubUrl = siteMetadata.github ? `https://github.com/${siteMetadata.github.replace(/^@/, ``)}` : null
  const linkedinUrl = siteMetadata.linkedin ? `  https://www.linkedin.com/in/${siteMetadata.linkedin.replace(/^@/, ``)}` : null
  const posts = allMarkdownRemark.edges
  const { setHomePage } = useHome()
  setHomePage(false)
  // useTranslations is aware of the global context (and therefore also "locale")
  // so it'll automatically give back the right translations
  const { bioPart1, bioPart2 } = useTranslations()

  return (
    <>
      <div className="container">
        <header className="author-header">
          <div className="author-header-content">
            <h1>{siteMetadata.author}</h1>
            <p style={{ marginBottom: 12 }}>{bioPart1}</p>
            <p>{bioPart2}</p>
            <div className="author-header-meta">
              {linkedinUrl && <a className="author-header-item" href={linkedinUrl} target="_blank"
                                 rel="noopener noreferrer">Linkedin</a>}
              {githubUrl && <a className="author-header-item" href={githubUrl} target="_blank"
                               rel="noopener noreferrer">Github</a>}
            </div>
          </div>
          <div className="author-header-image">
            {profileImage && <img src={profileImage.childImageSharp.fixed.src} alt={siteMetadata.author} />}
          </div>
        </header>
        <section className="post-feed">
          {posts.map(({ node }) => (
            <PostCard key={node.id} post={node} />
          ))}
        </section>
        <Pagination pageContext={pageContext} />
      </div>
    </>
  )
}

About.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.object.isRequired,
    allMarkdownRemark: PropTypes.object.isRequired
  }).isRequired,
  pageContext: PropTypes.object
}

export default About

export const pageQuery = graphql`
    query ($locale: String!, $dateFormat: String!, $limit: Int!, $skip: Int!) {
        site {
            siteMetadata {
                author
                github
                linkedin
            }
        }
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] },
            filter: { fields: { locale: { eq: $locale } } },
            limit: $limit,
            skip: $skip
        ) {
            edges {
                node {
                    id
                    timeToRead
                    frontmatter {
                        title
                        date(formatString: $dateFormat)
                        author
                        tag
                    }
                    fields {
                        slug
                    }
                    excerpt
                }
            }
        }
        profileImage: file(relativePath: { eq: "profile-image.jpg" }) {
            childImageSharp {
                fixed(width: 120, height: 120) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
    }
`
