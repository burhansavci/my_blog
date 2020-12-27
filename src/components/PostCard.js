import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { slugify } from "../util/utilityFunctions"

const PostCard = ({ post }) => {
  const url = `/${post.fields.slug}/`
  return (
    <div>
      <header className="post-card-header">
        {post.frontmatter.tag &&
        <Link to={`/tag/${slugify(post.frontmatter.tag)}`} className="post-card-primary-tag">
          {post.frontmatter.tag}
        </Link>
        }
      </header>
      <Link to={url} className="post-card">
        <header className="post-card-header">
          <h2 className="post-card-title">{post.frontmatter.title}</h2>
        </header>
        <section className="post-card-excerpt">{post.excerpt}</section>
        <footer className="post-card-footer">
          <div className="post-card-footer-left">
            <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>
            <span className="bull">•</span>
            {post.timeToRead} min read
          </div>
        </footer>
      </Link>
    </div>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    excerpt: PropTypes.string.isRequired,
    timeToRead: PropTypes.number,
    frontmatter: PropTypes.shape({
      title: PropTypes.string.isRequired,
      tag: PropTypes.string,
      date: PropTypes.string.isRequired
    }),
    fields: PropTypes.shape({
      slug: PropTypes.string.isRequired
    })
  }).isRequired
}

export default PostCard
