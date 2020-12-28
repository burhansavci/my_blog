const { slugify } = require("./src/util/utilityFunctions")
const path = require(`path`)
const { paginate } = require(`gatsby-awesome-pagination`)
const { createFilePath } = require(`gatsby-source-filesystem`)


exports.onCreateNode = ({ node, actions, getNode }) => {
  if (node.internal.type === "MarkdownRemark") {
    const { createNodeField } = actions
    const relativePath = createFilePath({ node, getNode, basePath: `posts/`, trailingSlash: false })
    const slugFromFileName = slugify(relativePath)
    const slugFromTag = slugify(node.frontmatter.tag)
    createNodeField({
      node,
      name: "slug",
      value: slugFromFileName
    })
    createNodeField({
      node,
      name: "slugTag",
      value: slugFromTag
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
  {
    allPosts: allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
    allTags: allMarkdownRemark {
      group(field: fields___slugTag) {
        totalCount
        fieldValue
      }
    }
  }
`)


  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const posts = result.data.allPosts.edges
  const tags = result.data.allTags.group

  const indexTemplate = path.resolve(`./src/templates/index.js`)
  const tagsTemplate = path.resolve(`./src/templates/tag.js`)
  const postTemplate = path.resolve(`./src/templates/post.js`)

  // Create tag pages
  tags.forEach((tag) => {
    const totalPosts = tag.totalCount !== null ? tag.totalCount : 0
    const numberOfPages = Math.ceil(totalPosts / 6)

    tag.url = `/tag/${tag.fieldValue}/`

    Array.from({ length: numberOfPages }).forEach((_, i) => {
      const currentPage = i + 1
      const prevPageNumber = currentPage <= 1 ? null : currentPage - 1
      const nextPageNumber = currentPage + 1 > numberOfPages ? null : currentPage + 1
      const previousPagePath = prevPageNumber
        ? prevPageNumber === 1
          ? tag.url
          : `${tag.url}page/${prevPageNumber}/`
        : null
      const nextPagePath = nextPageNumber
        ? `${tag.url}page/${nextPageNumber}/`
        : null

      createPage({
        path: i === 0 ? tag.url : `${tag.url}page/${i + 1}/`,
        component: tagsTemplate,
        context: {
          slugTag: tag.fieldValue,
          limit: 6,
          skip: i * 6,
          numberOfPages: numberOfPages,
          humanPageNumber: currentPage,
          prevPageNumber: prevPageNumber,
          nextPageNumber: nextPageNumber,
          previousPagePath: previousPagePath,
          nextPagePath: nextPagePath
        }
      })
    })
  })

  // Create post pages
  posts.forEach(({ node }) => {
    node.url = `/${node.fields.slug}/`

    createPage({
      path: node.url,
      component: postTemplate,
      context: {
        slug: node.fields.slug
      }
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
    }
  })


}