import React from 'react'
import { auth } from './firebase'

class EnsureLoginState extends React.Component {
  constructor() {
    super()

    this.isLogged = false

    if(auth.currentUser) {
      console.log(auth.currentUser)
    } else {
      console.log('neni prihlasen')
    }
  }

  render() {
    if(this.isLogged) {
      return this.props.children
    } else {
      return null
    }
  }
}

export default EnsureLoginState
