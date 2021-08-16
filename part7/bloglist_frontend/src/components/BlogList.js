import React from 'react'
import { useSelector }  from 'react-redux'
import Blog from './Blog'
import {
  Table,
  TableBody,
  TableContainer,
  Paper
} from '@material-ui/core'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog =>
              <Blog key={blog.id} blog={blog}/>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList
