import { useState } from 'react';
import blogService from '../services/blogs'

const Blog = ({ blog, onLike, onDelete }) => {
  const [expanded, setExpanded] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
          {blog.likes} <button onClick={() => onLike(blog)}>Likes</button> <br />
          {blog.user.name} <br />
          <button onClick={() => onDelete(blog)}>remove</button>
        </>
      }
    </div>
  )
}

export default Blog