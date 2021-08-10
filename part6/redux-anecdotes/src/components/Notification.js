import React from 'react'
import {connect} from 'react-redux'

const Notification = (props) => {
  const notification = props.notification

  if (notification === ''){
    return (<div />)
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification.notification
  }
}

export default connect(mapStateToProps)(Notification)
