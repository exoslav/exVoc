import React from 'react'

class Title extends React.Component {
  render() {
    return(
      <h1>
        <span class="title" >{this.props.title}</span>
        {/*<span class="subtitle" >{this.props.subtitle}</span>*/}
      </h1>
    )
  }
}

export default Title
