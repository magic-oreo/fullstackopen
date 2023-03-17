const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs === undefined
    ? 0
    : blogs.map(blog => blog.likes).reduce((a,b) => a+b)
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


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}