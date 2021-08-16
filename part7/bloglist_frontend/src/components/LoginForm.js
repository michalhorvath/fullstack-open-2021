import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { Button, TextField, Box } from '@material-ui/core'

const LoginForm = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>Login to application</h2>
      <div>
        <TextField label='username' value={username}
          onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        <TextField label='password' value={password} type='password'
          onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <Box mt={2}>
        <Button type='submit' id='login' color='primary' variant="contained">login</Button>
      </Box>
    </form>
  )
}

export default LoginForm





