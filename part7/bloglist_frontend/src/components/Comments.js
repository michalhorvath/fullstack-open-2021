import React from 'react'
import CommentForm from './CommentForm'

const Comments = ({ comments, blogId }) => {
  return (
    <div>
      <h2>comments</h2>
      <CommentForm blogId={blogId}/>
      <ul>
        {comments ? comments.map((comment, i) => (<li key={i}>{comment}</li>)) : null}
      </ul>
    </div>
  )
}

export default Comments
