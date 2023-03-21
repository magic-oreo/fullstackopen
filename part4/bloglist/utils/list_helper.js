const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs === undefined
    ? 0
    : blogs.map(blog => blog.likes).reduce((a, b) => a + b)
}

const favoriteBlog = (blogs) => {
  const favorite = () => {
    const favorite = blogs.find(blog => blog.likes === Math.max(...blogs.map(blog => blog.likes)))
    delete favorite._id
    delete favorite.__v
    delete favorite.url
    return favorite
  }
  return blogs === undefined
    ? undefined
    : favorite()
}

const mostBlogs = (blogs) => {
  const most = () => {
    const authorEntryMax = _.maxBy(_.entries(_.countBy(blogs, 'author')), _.last)
    return new Object({
      author: authorEntryMax[0],
      blogs: authorEntryMax[1]
    })
  }
  return blogs === undefined
    ? undefined
    : most()
}

const mostLikes = (blogs) => {
  const most = _.maxBy(_(blogs).groupBy('author').map(group => ({
    author: group[0].author,
    likes: _.sumBy(group, 'likes')
  })).value(), 'likes')
  return blogs === undefined
    ? undefined
    : most
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}