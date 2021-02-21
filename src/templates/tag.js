import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { PostCard, Pagination, SEO } from "../components"
import { useHome } from "../hooks/home"

const Tag = ({ data, pageContext }) => {
  const tagName = data.allMarkdownRemark.edges[0].node.frontmatter.tag
  const posts = data.allMarkdownRemark.edges
  const { setHomePage } = useHome()
  setHomePage(false)

  return (
    <>
      <SEO title={tagName} />
      <div className="container">
        <header className="tag-header">
          <h1>{tagName}</h1>
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

Tag.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.object.isRequired
  }).isRequired,
  pageContext: PropTypes.object
}

export default Tag

export const pageQuery = graphql`
    query ($locale: String!, $dateFormat: String!, $slugTag: String!, $limit: Int!, $skip: Int!) {
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] },
            filter: {fields: {slugTag: {eq: $slugTag}, locale: {eq: $locale}}},
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
                        slugTag
                    }
                    excerpt
                }
            }
        }
    }
`
