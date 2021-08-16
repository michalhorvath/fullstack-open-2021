import React, { useState } from 'react'
import { useDispatch   } from 'react-redux'
import { addComment } from '../reducers/blogReducer'
import { Button, TextField, Box } from '@material-ui/core'


const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch()

  const [comment, setComment] = useState('')

  const submitComment = (event) => {
    event.preventDefault()
    dispatch(addComment(blogId, comment))
    setComment('')
  }

  return (
    <form onSubmit={submitComment}>
      <TextField type='text' name='comment' value={comment} id='comment'
        onChange={({ target }) => setComment(target.value)}/>
      <Box display='inline' ml={2}>
        <Button variant='contained' color='primary' type='submit'>submit</Button>
      </Box>
    </form>
  )
}

export default CommentForm
