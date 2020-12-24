import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout isHome={true}>
    <SEO title="Home" />
    <h1>Home Page</h1>
  </Layout>
)

export default IndexPage
