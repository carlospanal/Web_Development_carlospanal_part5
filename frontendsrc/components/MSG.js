import React from 'react'
const MSG = ({ message }) => {
  if (message === null) {
    return null
  }
  if (message.mType=== 'success'){
    return (
      <div className="greenmessage">
        {message.content}
      </div>
    )
  }
  if (message.mType=== 'error'){
    return (
      <div className="redmessage">
        {message.content}
      </div>
    )
  }
}
export default MSG