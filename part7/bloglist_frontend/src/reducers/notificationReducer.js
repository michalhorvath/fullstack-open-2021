let timeout

const initialState = {
  message: null,
  severity: null
}

const reducer = (state = initialState, action) => {
  switch (action.type){
  case 'SET_NOTIFICATION':
    return action.data
  case 'RESET_NOTIFICATION':
    return { message: null }
  default:
    return state
  }
}

export const setNotification = (message, miliseconds) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, severity: 'success' }
    })

    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      dispatch({ type: 'RESET_NOTIFICATION' })
    }, miliseconds)
  }
}

export const setAlertNotification = (message, miliseconds) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, severity: 'error' }
    })

    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      dispatch({ type: 'RESET_NOTIFICATION' })
    }, miliseconds)
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }
}

export default reducer

