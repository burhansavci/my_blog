import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import { Layout, PostCard, Pagination } from "../components"

const About = ({ data, pageContext }) => {
  console.log(JSON.stringify(data))
  const { site, allMarkdownRemark, profileImage } = data
  const { siteMetadata } = site
  const githubUrl = siteMetadata.github ? `https://github.com/${siteMetadata.github.replace(/^@/, ``)}` : null
  const linkedinUrl = siteMetadata.linkedin ? `  https://www.linkedin.com/in/${siteMetadata.linkedin.replace(/^@/, ``)}` : null
  const posts = allMarkdownRemark.edges

  return (
    <>
      <Layout>
        <div className="container">
          <header className="author-header">
            <div className="author-header-content">
              <h1>{siteMetadata.author}</h1>
              <p style={{ marginBottom: 12 }}>{siteMetadata.bioPart1}</p>
              <p>{siteMetadata.bioPart2}</p>
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
      </Layout>
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
    query ($limit: Int!, $skip: Int!) {
        site {
            siteMetadata {
                author
                bioPart1
                bioPart2
                github
                linkedin
            }
        }
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] },
            limit: $limit,
            skip: $skip
        ) {
            edges {
                node {
                    id
                    timeToRead
                    frontmatter {
                        title
                        date(formatString: "Do MMM YYYY")
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
