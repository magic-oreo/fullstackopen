import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')

  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
        title:
          <input
            value={blogTitle}
            label="title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
        author:
          <input
            value={blogAuthor}
            label="author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
        url:
          <input
            value={blogUrl}
            label="url"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm