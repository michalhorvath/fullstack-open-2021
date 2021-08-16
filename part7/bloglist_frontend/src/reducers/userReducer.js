import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification, setAlertNotification } from '../reducers/notificationReducer'

const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type){
  case 'LOGIN_USER':
    return action.data
  case 'LOGOUT_USER':
    return initialState
  case 'INIT_USER':
    return action.data
  default:
    return state
  }
}

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      dispatch({
        type: 'LOGIN_USER',
        data: user
      })
      dispatch(setNotification('Login successfull', 3000))
    } catch (e) {
      dispatch(setAlertNotification('Login unsuccessfull', 3000))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch({
      type: 'LOGOUT_USER'
    })
    dispatch(setNotification('Logout successfull', 3000))
  }
}

export const initUser = () => {
  return async (dispatch) => {
    const loggedBloglistUser = window.localStorage.getItem('loggedBloglistUser')
    let user = null
    if (loggedBloglistUser) {
      user = JSON.parse(loggedBloglistUser)
      blogService.setToken(user.token)
    }
    dispatch({
      type: 'INIT_USER',
      data: user
    })
  }
}

export default reducer

