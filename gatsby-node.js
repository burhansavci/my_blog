const { slugify } = require("./src/util/utilityFunctions")
const path = require(`path`)
const { paginate } = require(`gatsby-awesome-pagination`)

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === "MarkdownRemark") {
    const { createNodeField } = actions
    const slugFromTitle = slugify(node.frontmatter.title)
    createNodeField({
      node,
      name: "slug",
      value: slugFromTitle
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
  {
    allMarkdownRemark {
      edges {
        node {
          fields{
           slug
           }
        }
      }
    }
  }
`)



  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.allMarkdownRemark.edges

  const indexTemplate = path.resolve(`./src/templates/index.js`)
  const postTemplate = path.resolve(`./src/templates/post.js`)

  // Create post pages
  posts.forEach(({ node }) => {
    node.url = `/${node.fields.slug}/`

    createPage({
      path: node.url,
      component: postTemplate,
      context: {
        slug: node.fields.slug,
      },
    })
  })

  // Create pagination
  paginate({
    createPage,
    items: posts,
    itemsPerPage: 6,
    component: indexTemplate,
    pathPrefix: ({ pageNumber }) => {
      if (pageNumber === 0) {
        return `/`
      } else {
        return `/page`
      }
    },
  })


}