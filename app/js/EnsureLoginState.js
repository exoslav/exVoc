import React from 'react'

class EnsureLoginState extends React.Component {
  constructor() {
    console.log('EnsureLoginState')
    super()

    // console.log(auth)
  }

  render() {
    return(
      <div>
        {console.log(this.props.children)}
        {this.props.children}
      </div>
    )
  }
}

export default EnsureLoginState
