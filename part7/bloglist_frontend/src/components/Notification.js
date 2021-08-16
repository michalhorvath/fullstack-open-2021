import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
  const { message, severity } = useSelector(state => state.notification)

  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      <Alert severity={severity}>
        {message}
      </Alert>
    </div>
  )
}

export default Notification
