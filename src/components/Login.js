import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import Question from './Question'

class Login extends Component {
  authUser = (e, id) => {
    e.preventDefault()
    const { dispatch } = this.props

    dispatch(setAuthedUser(id))
  }

  render() {
    return (
      <div>
        <h3 className='center'>Welcome to the Would You Rather App!</h3>
        <h2 className='center'>Please sign in to continue</h2>
        <h2 className='center'>Sign in</h2>
        <ul className='dashboard-list'>
          {this.props.userIds.map((userId) => (
            <li onClick={(e) => this.authUser(e, userId)} key={userId}>
                {userId}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    userIds: Object.keys(users)
  }
}

export default connect(mapStateToProps)(Login)