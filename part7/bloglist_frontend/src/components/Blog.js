import React  from 'react'
import { Link } from 'react-router-dom'
import {
  TableRow,
  TableCell,
  Button
} from '@material-ui/core'

const Blog = ({ blog }) => {

  return (
    <TableRow className='blog' >
      <TableCell>
        <Button color='primary' component={Link} to={`/blogs/${blog.id}`} >
          {blog.title} {blog.author}
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default Blog
