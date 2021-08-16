import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import Comments from './Comments'
import { Button, Box } from '@material-ui/core'


const BlogDetails = ({ blog }) => {
  if (!blog){
    return null
  }

  const dispatch = useDispatch()
  const history = useHistory()

  const handleRemove = () => {
    dispatch(removeBlog(blog.id))
    history.push('/')
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
        <Box display='inline' ml={2}>
          <Button variant='outlined' color='secondary' onClick={handleRemove}>remove</Button>
        </Box>
      </h2>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes
        <Box display='inline' ml={0}>
          <Button color='primary' size='small'
            onClick={() => dispatch(likeBlog(blog.id))}>like</Button>
        </Box>
      </div>
      <div>added by {blog.user.name}</div>
      <Comments comments={blog.comments} blogId={blog.id}/>
    </div>
  )
}

export default BlogDetails
