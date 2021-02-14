import React from "react"

import { LocalizedLink, SEO, useTranslations } from "../components"

const NotFoundPage = () => {
  const { pageNotFound, returnHome } = useTranslations()
  return <>
    <SEO title="404: Not found" />
    <article className="content" style={{ textAlign: `center` }}>
      <h1 className="content-title">Error 404</h1>
      <section className="content-body">
        {pageNotFound}, <LocalizedLink to="/">{returnHome}</LocalizedLink>
      </section>
    </article>
  </>
}

export default NotFoundPage
