import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser  } from '../reducers/userReducer'
import { AppBar, Button, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButtons: {
    marginRight: theme.spacing(2),
    flexGrow: 1,
  },
  title: {
  },
}))


const NavBar = ({ user }) => {
  const dispatch = useDispatch()

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <span className={classes.menuButtons}>
            <Button color='inherit' component={Link} to='/'>blogs</Button>
            <Button color='inherit' component={Link} to='/users'>users</Button>
          </span>
          <span >
            {user !== null ? (
              <>{user.name} logged in <Button color='inherit' onClick={() => {dispatch(logoutUser())}}>log out</Button></>
            ) :
              <>no user is logged in</>
            }
          </span>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar
