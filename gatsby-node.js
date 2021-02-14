const { slugify, removeTrailingSlash, findKey } = require("./src/utils/gatsby-node-helpers")
const path = require(`path`)
const { paginate } = require(`gatsby-awesome-pagination`)
const locales = require(`./config/i18n`)

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  // First delete the incoming page that was automatically created by Gatsby
  // So everything in src/pages/
  deletePage(page)

  // Grab the keys ('en' & 'tr') of locales and map over them
  Object.keys(locales).map(lang => {
    // Use the values defined in "locales" to construct the path
    const localizedPath = locales[lang].default
      ? page.path
      : `${locales[lang].path}${page.path}`

    return createPage({
      // Pass on everything from the original page
      ...page,
      // Since page.path returns with a trailing slash (e.g. "/tr/")
      // We want to remove that (e.g. "tr/")
      path: removeTrailingSlash(localizedPath),
      // Pass in the locale as context to every page
      // This context also gets passed to the src/components/layout file
      // This should ensure that the locale is available on every page
      context: {
        ...page.context,
        locale: lang,
        dateFormat: locales[lang].dateFormat
      }
    })
  })
}

exports.onCreateNode = ({ node, actions }) => {
  if (node.internal.type === "MarkdownRemark") {
    const { createNodeField } = actions

    // Use path.basename
    // https://nodejs.org/api/path.html#path_path_basename_path_ext
    // It will return the file name without '.md' string (e.g. "file-name" or "file-name.lang")
    const name = path.basename(node.fileAbsolutePath, `.md`)

    // Find the key that has "default: true" set (in this case it returns "en")
    const defaultKey = findKey(locales, o => o.default === true)

    // Check if file.name.lang has the default lang type.
    // (in this case the default language is for files set with "en")
    const isDefault = name.split(`.`)[1] === defaultKey

    // Files are defined with "name-with-dashes.lang.md"
    // So grab the lang from that string
    // If it's the default language, pass the locale for that
    const lang = isDefault ? defaultKey : name.split(`.`)[1]

    // Get the entire file name and remove the lang of it
    const slugFileName = slugify(name.split(`.`)[0])

    // Than remove the date if the name has the date info
    const slug =
      slugFileName.length >= 10
        ? slugFileName.slice(11)
        : slugFileName
    const slugFromTag = slugify(node.frontmatter.tag)

    createNodeField({ node, name: "slug", value: slug })
    createNodeField({ node, name: `locale`, value: lang })
    createNodeField({ node, name: `isDefault`, value: isDefault })
    createNodeField({ node, name: "slugTag", value: slugFromTag })
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
            locale
            isDefault
            slug
            slugTag
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

  const posts = result.data.allPosts.edges

  const indexTemplate = path.resolve(`./src/templates/index.js`)
  const tagsTemplate = path.resolve(`./src/templates/tag.js`)
  const aboutTemplate = path.resolve(`./src/templates/about.js`)
  const postTemplate = path.resolve(`./src/templates/post.js`)

  // Create about page
  Object.keys(locales).map(lang => {
    // Use the values defined in "locales" to construct the path
    const localizedPath = locales[lang].default
      ? ``
      : `/${locales[lang].path}`

    paginate({
      createPage,
      items: posts.filter(post => post.node.fields.locale === lang),
      itemsPerPage: 1,
      component: aboutTemplate,
      pathPrefix: ({ pageNumber }) => {
        if (pageNumber === 0) {
          return `${localizedPath}/about`
        } else {
          return `${localizedPath}/about/page`
        }
      },
      context: {
        locale: lang,
        dateFormat: locales[lang].dateFormat
      }
    })
  })

  // Create tag pages
  Object.keys(locales).map(lang => {
    // Use the values defined in "locales" to construct the path
    const localizedPath = locales[lang].default
      ? ``
      : `/${locales[lang].path}`

    const postsByTag = posts.filter(post => post.node.fields.locale === lang).reduce((postsByTag, post) => {
      (postsByTag[post.node.fields.slugTag] = postsByTag[post.node.fields.slugTag] || []).push(post)
      return postsByTag
    }, {})

    Object.keys(postsByTag).map(tag => {
      paginate({
        createPage,
        items: postsByTag[tag],
        itemsPerPage: 1,
        component: tagsTemplate,
        pathPrefix: ({ pageNumber }) => {
          if (pageNumber === 0) {
            return `${localizedPath}/tag/${tag}`
          } else {
            return `${localizedPath}/tag/${tag}/page`
          }
        },
        context: {
          locale: lang,
          dateFormat: locales[lang].dateFormat,
          slugTag: tag
        }
      })
    })
  })

  // Create post pages
  posts.forEach(({ node }) => {
    node.url = node.fields.isDefault ? `/${node.fields.slug}` : `/${node.fields.locale}/${node.fields.slug}`
    createPage({
      path: node.url,
      component: postTemplate,
      context: {
        slug: node.fields.slug,
        locale: node.fields.locale,
        dateFormat: locales[node.fields.locale].dateFormat
      }
    })
  })

  // Create pagination
  Object.keys(locales).map(lang => {
    // Use the values defined in "locales" to construct the path
    const localizedPath = locales[lang].default
      ? `/`
      : `/${locales[lang].path}/`

    paginate({
      createPage,
      items: posts.filter(post => post.node.fields.locale === lang),
      itemsPerPage: 1,
      component: indexTemplate,
      pathPrefix: ({ pageNumber }) => {
        if (pageNumber === 0) {
          return localizedPath
        } else {
          return `${localizedPath}page`
        }
      },
      context: {
        locale: lang,
        dateFormat: locales[lang].dateFormat
      }
    })
  })
}