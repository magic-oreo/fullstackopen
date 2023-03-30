import { useState } from 'react';

const Blog = ({ blog, user, onLike, onDelete }) => {
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
          
          {blog.user.name === user.name && 
          <button onClick={() => onDelete(blog)}>remove</button> 
          }

         </>
      }
    </div>
  )
}

export default Blog