const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blog = await Blog.find({})
  response.json(blog)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const result = await blog.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const { title, author, url } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, { title, author, url }, { new: true, runeValidators: true, context: 'query' })
  response.json(updatedBlog)
})

module.exports = blogRouter