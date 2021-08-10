const initialState = {
  notification: '',
  timeout: null
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_NOTIFICATION': {
      if (state.timeout) {
        clearTimeout(state.timeout)
      }
      return {
        notification: action.data.notification, 
        timeout: action.data.timeout
      }
    }
    case 'RESET_NOTIFICATION' : {
      return initialState
    }
    default:
  }

  return state
}

export const setNotification = (notification, seconds) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        notification,
        timeout: setTimeout(() => {dispatch(resetNotification())}, seconds * 1000)
      }
    })
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }
}

export default reducer
