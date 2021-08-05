import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog }) => {
  const [fullDetailsVisible, setFullDetailsVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenFullDetails = { display: fullDetailsVisible ? '' : 'none' }
  const hideWhenFullDetails = { display: fullDetailsVisible ? 'none' : '' }


  return (
    <div style={blogStyle} className='blog' >
      {blog.title} {blog.author}
      <button style={hideWhenFullDetails} onClick={() => setFullDetailsVisible(true)}>view</button>
      <button style={showWhenFullDetails} onClick={() => setFullDetailsVisible(false)}>hide</button>
      <div style={showWhenFullDetails} >{blog.url}</div>
      <div style={showWhenFullDetails} className='likes' >likes {blog.likes} <button onClick={likeBlog}>like</button></div>
      <div style={showWhenFullDetails} >{blog.user.name}</div>
      {removeBlog ? <button onClick={removeBlog}>remove</button> : null}
    </div>
  )
}

export default Blog
