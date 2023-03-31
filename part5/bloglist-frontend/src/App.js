import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    updateBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, type) => {
    setMessageType(type)
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const updateBlogs = () => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => a.likes < b.likes ? 1 : -1)
      setBlogs(blogs)
    })
  }

  const increaseLikes = (blog) => {
    blog['likes']++
    blogService
      .update(blog.id, blog)
      .then(() => updateBlogs())
  }

  const removeBlog = (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      blogService
        .remove(blog.id)
        .catch(error => {
          showNotification(error.message, 'error')
        })
      setBlogs(blogs.filter(n => n.id !== blog.id))
    }
  }

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      showNotification('Login successful', 'success')
    } catch (error) {
      showNotification(error.message, 'error')
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        returnedBlog['user'] = {
          name: user.name
        }
        setBlogs(blogs.concat(returnedBlog))
        showNotification(`a new blog ${blogObject.title} has been added by ${blogObject.author}`, 'success')
      })
      .catch(() => {
        showNotification('Unable to create blog', 'error')
      })

  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={messageType} />
      {!user &&
        <Togglable buttonLabel="log in">
          <LoginForm createUser={handleLogin} />
        </Togglable>}
      {user && <div>
        <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} onLike={increaseLikes} onDelete={removeBlog} user={user} />
        )}
      </div>
      }
    </div>
  )
}

export default App