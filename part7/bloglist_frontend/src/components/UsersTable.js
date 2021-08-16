import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  tableHeaderCell: {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main)
  }
}))

const UsersTable = () => {
  const users = useSelector(state => state.users.map(user => {
    return {
      ...user,
      blogsCreated: user.blogs.length
    }}))


  const classes = useStyles()

  return (
    <div>
      <h2>Users:</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}></TableCell>
              <TableCell className={classes.tableHeaderCell}>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Button color='primary' component={Link} to={`/users/${user.id}`}>{user.name}</Button>
                </TableCell>
                <TableCell>{user.blogsCreated}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UsersTable
