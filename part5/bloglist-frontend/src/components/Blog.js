import { useState } from 'react';
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const increaseLikes = () => {
    blog['likes']++
    setLikes(blog.likes)
    blogService
      .update(blog.id, blog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}, {blog.author}
        <button onClick={() => setExpanded(!expanded)}>
          {expanded ? 'hide' : 'view'}
        </button>
      </div>
      {expanded &&
        <>
          <a href={blog.url}>{blog.url}</a> <br />
          {likes} <button onClick={() => increaseLikes()}>Likes</button> <br />
          {blog.user.name}
        </>
      }
    </div>
  )
}

export default Blog