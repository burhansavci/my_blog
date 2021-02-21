import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { slugify } from "../utils/gatsby-node-helpers"
import { DiscussionEmbed } from "disqus-react"
import { useHome } from "../hooks/home"
import { LocalizedLink, SEO, useTranslations } from "../components"


const Post = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const baseUrl = "https://burhansavci.netlify.app/"
  const disqusShortname = "https-burhansavci-netlify-app"
  const disqusConfig = {
    identifier: data.markdownRemark.id,
    title: post.title,
    url: baseUrl + pageContext.slug
  }
  const { setHomePage } = useHome()
  setHomePage(false)
  const { min, read, time } = useTranslations()

  return (
    <>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
      />
      <div className="container">
        <article className="content">
          <section className="post-full-content">

            <header className="post-full-header">

              <section className="post-full-tags">
                <LocalizedLink to={`/tag/${slugify(post.frontmatter.tag)}`}>{post.frontmatter.tag}</LocalizedLink>
              </section>

              <h1 className="post-full-title">{post.frontmatter.title}</h1>

              <div className="post-full-byline">
                <section className="post-full-byline-content">
                  <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
                  <span className="bull">•</span>
                  {post.timeToRead} {min} {read} {time}
                </section>
              </div>

            </header>

            <section
              className="content-body load-external-scripts"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </section>
          <DiscussionEmbed style={{ margin: "0 auto", maxWidth: "840px" }} shortname={disqusShortname}
                           config={disqusConfig} />
        </article>
      </div>
    </>
  )
}

Post.propTypes =
  {
    data: PropTypes.shape({
      markdownRemark: PropTypes.shape({
        html: PropTypes.string.isRequired,
        timeToRead: PropTypes.number.isRequired,
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
    query($slug: String!, $locale: String!) {
        markdownRemark(fields: { slug: { eq: $slug }, locale: { eq: $locale } }) {
            id
            html
            timeToRead
            excerpt
            frontmatter {
                title
                author
                date(formatString: "Do MMM YYYY")
                tag
            }
        }
    }
`
