const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  test('a specific author is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.author)

    expect(contents).toContain(
      'Michael Chan'
    )
  })
  test('Unique identifier property of blogs is named id', async () => {
    const response = (await api.get('/api/blogs')).body[0]
    expect(response._id).toBeUndefined()
    expect(response.id).toBeDefined()
  })
})
describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {
    const user = await User.findOne()
    await api
      .post('/api/blogs')
      .set(helper.authorizationHeader(user))
      .send(helper.exampleBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
      'Another day in the life'
    )
  })
  test('has the default value of likes as zero', async () => {
    const user = await User.findOne()
    const response = await api
      .post('/api/blogs')
      .set(helper.authorizationHeader(user))
      .send(helper.exampleBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toEqual(0)
  })
  test('fails with status code 400 if title is invalid', async () => {
    const user = await User.findOne()
    const newBlog = {
      author: 'magic-oreo',
      url: 'invalid url'
    }

    await api
      .post('/api/blogs')
      .set(helper.authorizationHeader(user))
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
  test('fails with status code 400 if url is invalid', async () => {
    const newBlog = {
      author: 'magic-oreo',
      title: 'Some title'
    }
    const user = await User.findOne()
    await api
      .post('/api/blogs')
      .set(helper.authorizationHeader(user))
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('fails with status code 401 if the token is invalid', async () => {
    const newBlog = {
      author: 'magic-oreo',
      title: 'Some title'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    expect(response.text).toContain('invalid token')
  })
})
describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const user = await User.findOne()
    const blog = await Blog.create({ ...helper.exampleBlog, user: user._id })
    await api
      .delete(`/api/blogs/${blog.id}`)
      .set(helper.authorizationHeader(user))
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )

    const contents = blogsAtEnd.map(r => r.id)

    expect(contents).not.toContain(helper.exampleBlog.id)
  })
})
describe('updating a blog', () => {
  test('succeeds if data is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const user = await User.findOne()
    const newBlog = {
      author: 'new title'
    }
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set(helper.authorizationHeader(user))
      .send(newBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].author).toEqual(newBlog.author)
  })
})
afterAll(async () => {
  await mongoose.connection.close()
})