import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, PostCard, Pagination, SEO } from "../components"

const Index = ({ data,  pageContext }) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <>
      <Layout isHome={true}>
        <SEO title="Home" />
        <div className="container">
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

Index.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.object.isRequired,
  }).isRequired,
  pageContext: PropTypes.object,
}

export default Index

export const pageQuery = graphql`
    query ($limit: Int!, $skip: Int!) {
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
    }
`
