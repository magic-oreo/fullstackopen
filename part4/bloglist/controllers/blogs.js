const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blog = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blog)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findOne()

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user === null ? '' : user.id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { title, author, url, likes }, { new: true, runeValidators: true, context: 'query' })
  response.json(updatedBlog)
})

module.exports = blogRouter