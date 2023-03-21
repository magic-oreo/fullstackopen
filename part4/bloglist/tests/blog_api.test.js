const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('API Requests', () => {
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
  test('a blog can be added and verified', async () => {
    await api
      .post('/api/blogs')
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
  test('The default value for likes is zero', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.exampleBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toEqual(0)
  })
  test('If new blog does not has a title, return 400', async () => {
    const newBlog = {
      author: 'magic-oreo',
      url: 'invalid url'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
  test('If new blog does not include url, return 400', async () => {
    const newBlog = {
      author: 'magic-oreo',
      title: 'Some title'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})