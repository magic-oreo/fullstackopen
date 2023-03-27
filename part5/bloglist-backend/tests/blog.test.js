const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {
  test('when list has only one blog, returns the likes of that blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs, returns the likes of all blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })

  test('when list has zero blogs, returns the likes of zero blogs', () => {
    const result = listHelper.totalLikes()
    expect(result).toBe(0)
  })
})

describe('favorite blog', () => {
  test('when list has only one blog, returns blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    const expected = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    expect(result).toStrictEqual(expected)
  })

  test('when list has many blogs, returns most liked blog', () => {
    const result = listHelper.favoriteBlog(blogs)
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    expect(result).toStrictEqual(expected)
  })

  test('when list has zero blogs, returns undefined', () => {
    const result = listHelper.favoriteBlog()
    expect(result).toStrictEqual(undefined)
  })
})

describe('most blogs', () => {
  test('when list has only one blog, returns author and one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    const expected = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }
    expect(result).toStrictEqual(expected)
  })

  test('when list has many blogs, returns author and number of blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    expect(result).toStrictEqual(expected)
  })
  test('when list has zero blogs, returns undefined', () => {
    const result = listHelper.mostBlogs()
    expect(result).toStrictEqual(undefined)
  })
})

describe('most likes', () => {
  test('when list has only one blog, returns author and likes', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 5
    }
    expect(result).toStrictEqual(expected)
  })

  test('when list has many blogs, returns author and total likes', () => {
    const result = listHelper.mostLikes(blogs)
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    expect(result).toStrictEqual(expected)
  })
  test('when list has zero blogs, returns undefined', () => {
    const result = listHelper.mostLikes()
    expect(result).toStrictEqual(undefined)
  })
})