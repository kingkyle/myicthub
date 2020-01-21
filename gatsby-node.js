const { slugify } = require("./src/utils/utilities")
const path = require("path")
const _ = require("lodash")

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slugFromTitle = slugify(node.frontmatter.title)
    createNodeField({
      node,
      name: "slug",
      value: slugFromTitle,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const templates = {
    singlePost: path.resolve("src/templates/SinglePost.tsx"),
    postList: path.resolve("src/templates/PostList.tsx"),
    categoryPostList: path.resolve("src/templates/CategoryPostList.tsx"),
  }

  return graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              categories
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(res => {
    if (res.errors) return Promise.reject(res.errors)
    const posts = res.data.allMarkdownRemark.edges
    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: templates.singlePost,
        context: { slug: node.fields.slug },
      })
    })

    let categories = []
    _.each(posts, edge => {
      if (_.get(edge, "node.frontmatter.categories")) {
        categories = categories.concat(edge.node.frontmatter.categories)
      }
    })
    let categoryPostCount = {}
    categories.forEach(category => {
      categoryPostCount[category] = (categoryPostCount[category] || 0) + 1
    })
    categories = _.uniq(categories)

    categories.forEach(category => {
      const postPerPage = 10
      const numberOfPages = Math.ceil(categoryPostCount[category] / postPerPage)
      Array.from({ length: numberOfPages }).forEach((_, index) => {
        const isFirstPage = index === 0
        const currentPage = index + 1
        if (isFirstPage) {
          createPage({
            path: `/category/${slugify(category)}`,
            component: templates.categoryPostList,
            context: {
              limit: postPerPage,
              skip: index * postPerPage,
              numberOfPages,
              currentPage,
              category,
            },
          })
        } else {
          createPage({
            path: `/category/${slugify(category)}/${currentPage}`,
            component: templates.categoryPostList,
            context: {
              limit: postPerPage,
              skip: index * postPerPage,
              numberOfPages,
              currentPage,
              category,
            },
          })
        }
      })
    })

    const postPerPage = 10
    const numberOfPages = Math.ceil(posts.length / postPerPage)
    Array.from({ length: numberOfPages }).forEach((_, index) => {
      const isFirstPage = index === 0
      const currentPage = index + 1
      if (isFirstPage) return
      createPage({
        path: `/page/${currentPage}`,
        component: templates.postList,
        context: {
          limit: postPerPage,
          skip: index * postPerPage,
          numberOfPages,
          currentPage,
        },
      })
    })
  })
}
