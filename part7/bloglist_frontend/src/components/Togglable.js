import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Box } from '@material-ui/core'

const Togglable = React.forwardRef((props,ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Box mb={2} mt={2}>
          <Button variant='contained' color='primary' onClick={toggleVisibility}>{props.buttonLabel}</Button>
        </Box>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Box mb={2} mt={2}>
          <Button variant='contained' color='primary' onClick={toggleVisibility}>cancel</Button>
        </Box>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable
