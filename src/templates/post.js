import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"

import Layout from "../components/Layout"
import { slugify } from "../util/utilityFunctions"

const Post = ({ data }) => {
  const post = data.markdownRemark

  return (
    <>
      <Layout>
        <div className="container">
          <article className="content">
            <section className="post-full-content">

              <header className="post-full-header">

                <section className="post-full-tags">
                  <Link to={`/tag/${slugify(post.frontmatter.tag)}`}>{post.frontmatter.tag}</Link>
                </section>

                <h1 className="post-full-title">{post.frontmatter.title}</h1>

                <div className="post-full-byline">
                    <section className="post-full-byline-content">
                        <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
                        <span className="bull">•</span>
                        {post.timeToRead} min read
                    </section>
                </div>

              </header>


              <section
                className="content-body load-external-scripts"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </section>
          </article>
        </div>
      </Layout>
    </>
)
}

Post.propTypes =
  {
    data: PropTypes.shape({
      markdownRemark: PropTypes.shape({
        html: PropTypes.string.isRequired,
        timeToRead:PropTypes.number.isRequired,
        frontmatter: PropTypes.shape({
          title: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
          tag: PropTypes.string
        })
      }).isRequired
    }).isRequired
  }

export default Post

export const postQuery = graphql`
    query ($slug: String!) {
        markdownRemark(fields: {slug: {eq: $slug}}) {
            id
            html
            timeToRead
            frontmatter {
                title
                author
                date(formatString: "Do MMM YYYY")
                tag
            }
        }
    }`