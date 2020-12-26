import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const PostCard = ({ post }) => {
  const url = `/${post.slug}/`

  return (
    <Link to={url} className="post-card">
      <header className="post-card-header">
        {post.tag && <div className="post-card-tags"><span><a>{post.tag}</a></span></div>}
        <h2 className="post-card-title">{post.title}</h2>
      </header>
      <section className="post-card-excerpt">{post.excerpt}</section>
      <footer className="post-card-footer">
        <div className="post-card-footer-left">
          <span>{post.author}</span>
        </div>
        <div className="post-card-footer-right">
          {/*Reading time will go here*/}
        </div>
      </footer>
    </Link>
  )
}

PostCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tag: PropTypes.string,
    excerpt: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  }).isRequired
}

export default PostCard
