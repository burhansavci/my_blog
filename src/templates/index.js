import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { PostCard, Pagination, SEO } from "../components"
import { useHome } from "../hooks/home"

const Index = ({ data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges
  const { setHomePage } = useHome()
  setHomePage(true)

  return (
    <>
      <SEO title="Home" />
      <div className="container">
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

Index.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.object.isRequired
  }).isRequired,
  pageContext: PropTypes.object
}

export default Index

export const pageQuery = graphql`
    query($locale: String!, $dateFormat: String!, $limit: Int!, $skip: Int!) {
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { fields: { locale: { eq: $locale } } }
            limit: $limit
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
                        locale
                        slug
                    }
                    excerpt
                }
            }
        }
    }
`