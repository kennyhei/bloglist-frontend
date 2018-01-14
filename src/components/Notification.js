import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {

    if (!notification.content) {
        return null
    }

    return (
        <div className={notification.type}>
            {notification.content}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      notification: state.notification
    }
  }
  
  const ConnectedNotification = connect(mapStateToProps)(Notification)
  
  export default ConnectedNotification
