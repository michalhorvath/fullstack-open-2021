import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Switch, Route, useRouteMatch } from 'react-router-dom'

import Container from '@material-ui/core/Container'

import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import UsersTable from './components/UsersTable'
import UserDetails from './components/UserDetails'
import BlogDetails from './components/BlogDetails'
import NavBar from './components/NavBar'

import { initBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  useEffect(() => {
    dispatch(initUser())
  }, [])

  useEffect(() => {
    dispatch(initUsers())
  }, [])

  const users = useSelector(state => state.users)
  const matchUsers = useRouteMatch('/users/:id')
  const userDetails = matchUsers ? users.find(user => user.id === matchUsers.params.id) : null

  const blogs = useSelector(state => state.blogs)
  const matchBlogs = useRouteMatch('/blogs/:id')
  const blogDetails = matchBlogs ? blogs.find(blog => blog.id === matchBlogs.params.id) : null

  return (
    <Container>
      <NavBar user={user}/>
      <Notification />
      <h2>blog app</h2>
      <Switch>
        <Route path='/blogs/:id'>
          <BlogDetails blog={blogDetails}/>
        </Route>
        <Route path='/users/:id'>
          <UserDetails user={userDetails}/>
        </Route>
        <Route path='/users'>
          <UsersTable/>
        </Route>
        <Route path='/'>
          {user === null ?
            <LoginForm /> :
            (
              <div>
                <Togglable buttonLabel='add new blog' ref={blogFormRef}>
                  <BlogForm toggleVisibility={() => {blogFormRef.current.toggleVisibility()}}/>
                </Togglable>
                <BlogList />
              </div>
            )
          }
        </Route>
      </Switch>
    </Container>
  )
}

export default App
