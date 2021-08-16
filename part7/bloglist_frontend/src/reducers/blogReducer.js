import blogService from '../services/blogs'
import { setNotification, setAlertNotification } from '../reducers/notificationReducer'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type){
  case 'INIT_BLOGS':
    return action.data
  case 'CREATE_BLOG':
    return state.concat(action.data)
  case 'LIKE_BLOG':
    return state.map(blog => blog.id === action.data.id ? action.data : blog)
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data)
  case 'COMMENT_BLOG':
    return state.map(blog => blog.id === action.data.id ? action.data : blog)
  default:
    return state
  }
}

export const createBlog = ({ title, author, url }) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create({ title, author, url })
      dispatch({
        type: 'CREATE_BLOG',
        data: newBlog
      })
      dispatch(setNotification(`new blog ${newBlog.title} by ${newBlog.author} added`, 3000))
    } catch (e) {
      dispatch(setAlertNotification('blog submit failed', 3000))
    }
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      const blogToChange = blogs.find(blog => blog.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1
      }
      await blogService.update(id, changedBlog)
      dispatch({
        type: 'LIKE_BLOG',
        data: changedBlog
      })
      dispatch(setNotification(`blog ${changedBlog.title} liked`, 3000))
    } catch (e) {
      dispatch(setAlertNotification('blog liking failed', 3000))
    }
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'REMOVE_BLOG',
        data: id
      })
      dispatch(setNotification('blog removed successfully', 3000))
    } catch (e) {
      dispatch(setAlertNotification('blog removing failed', 3000))
    }
  }
}

export const addComment = (id, comment) => {
  return async (dispatch) => {
    try {
      const changedBlog = await blogService.addComment(id, comment)
      dispatch({
        type: 'COMMENT_BLOG',
        data: changedBlog
      })
      dispatch(setNotification('comment added', 3000))
    } catch (e) {
      dispatch(setAlertNotification('there was issue with adding comment', 3000))
    }
  }
}

export default reducer

