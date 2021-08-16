import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Button, TextField, Box } from '@material-ui/core'

const BlogForm = ({ toggleVisibility }) => {
  const dispatch = useDispatch()

  const [title, setTitle]  = useState('')
  const [author, setAuthor]  = useState('')
  const [url, setUrl]  = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    dispatch(createBlog(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
    toggleVisibility()
  }

  return (
    <form onSubmit={addBlog}>
      <h2>createNew</h2>
      <div>
        <TextField label='title' value={title} name='title' id='title'
          onChange={({ target }) => setTitle(target.value)}/>
      </div>
      <div>
        <TextField label='author' type='text' value={author} name='author' id='author'
          onChange={({ target }) => setAuthor(target.value)}/>
      </div>
      <div>
        <TextField label='url' type='text' value={url} name='url' id='url'
          onChange={({ target }) => setUrl(target.value)}/>
      </div>
      <Box mt={2}>
        <Button variant='contained' color='primary' type='create'>submit</Button>
      </Box>
    </form>
  )
}

export default BlogForm
