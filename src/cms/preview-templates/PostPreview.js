import React from "react"
import moment from 'moment'

const PostPreview = ({ entry }) => {
  const data = entry.getIn(["data"]).toJS()
  const postDate = moment(data.date).format('MMMM DD, YYYY')
  return (
    <div className="container">
      <article className="content">
        <section className="post-full-content">

          <header className="post-full-header">

            <section className="post-full-tags">
              <a href="/">{data.tag}</a>
            </section>

            <h1 className="post-full-title">{data.title}</h1>

            <div className="post-full-byline">
              <section className="post-full-byline-content">
                <time>{postDate}</time>
              </section>
            </div>

          </header>

          <section
            className="content-body load-external-scripts"
            dangerouslySetInnerHTML={{ __html: data.body }}
          />
        </section>
      </article>
    </div>
  )
}


export default PostPreview