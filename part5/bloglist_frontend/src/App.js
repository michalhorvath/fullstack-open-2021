import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)

  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [notification, setNotification] =useState('')
  const [error, setError] =useState('')

  const blogFromRef = useRef()

  const showNotification = text => {
    setNotification(text)
    setTimeout(() => {setNotification('')}, 3000)
  }

  const showError = text => {
    setError(text)
    setTimeout(() => {setError('')}, 3000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
    } catch (expection) {
      showError('Wrong credentials')
    }

  }

  const handleLogout = (event) => {
    setUser(null)
    showNotification('user logger out')
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
  }

  const addBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      showNotification(`new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setBlogs(blogs.concat(returnedBlog))
      blogFromRef.current.toggleVisibility()
    } catch (expection) {
      showError('blog submit failed')
    }
  }

  const likeBlog = async (id) => {
    try {
      const likedBlog = blogs.find(blog => blog.id === id)
      likedBlog.likes = likedBlog.likes + 1
      await blogService.update(id, likedBlog)
      setBlogs(blogs.map(blog => blog.id === id ? likedBlog : blog))
    } catch (exception) {
      showError('there was issue liking the blog')
    }
  }

  const removeBlog = async (id) => {
    const result = window.confirm(`Are you sure to delete ${blogs.find(blog => blog.id === id).title}?`)
    if (!result) {
      return
    }
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      showNotification('blog successfully deleted')
    } catch (exception) {
      showError('there was issue deleting the blog')
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login to application</h2>
      <Notification message={notification} color='green'/>
      <Notification message={error} color='red'/>
      <div>
        username: <input type='text' value={username} name='username' id='username'
          onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        password: <input type='password' value={password} name='password' id='password'
          onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button type='submit' id='login' >login</button>
    </form>
  )

  const blogsList = () => (
    <div>
      {blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={() => likeBlog(blog.id)}
          removeBlog={blog.user.username === user.username ? () => removeBlog(blog.id) : null}
        />
      )}
    </div>
  )


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedBloglistUser = window.localStorage.getItem('loggedBloglistUser')
    if (loggedBloglistUser) {
      const user = JSON.parse(loggedBloglistUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {user === null ?
        loginForm() :
        (
          <div>
            <h2>blogs</h2>
            <Notification message={notification} color='green'/>
            <Notification message={error} color='red'/>
            <div>{user.name} logged in <button onClick={handleLogout}>log out</button></div>
            <br/>
            <Togglable buttonLabel='add new blog' ref={blogFromRef}>
              <BlogForm createBlog={addBlog} />
            </Togglable>
            {blogsList()}
          </div>
        )
      }
    </div>
  )
}

export default App
