import React, { useState } from 'react'

const Notification = ({ message, color }) => {
  const notificationStyle = {
    color: color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null || message === '') {
    return null
  }

  return (
    <div style={notificationStyle} className='error'>
      {message}
    </div>
  )
}

export default Notification
