import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle]  = useState('')
  const [author, setAuthor]  = useState('')
  const [url, setUrl]  = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2>createNew</h2>
      <div>
        title: <input type='text' value={title} name='title' id='title'
          onChange={({ target }) => setTitle(target.value)}/>
      </div>
      <div>
        author: <input type='text' value={author} name='author' id='author'
          onChange={({ target }) => setAuthor(target.value)}/>
      </div>
      <div>
        url: <input type='text' value={url} name='url' id='url'
          onChange={({ target }) => setUrl(target.value)}/>
      </div>
      <button type='create'>submit</button>
    </form>
  )
}

export default BlogForm
