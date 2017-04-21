import React from 'react'
import { vocabularyLang } from '../../userState'

class Item extends React.Component {
  render() {
    const activeClassName = this.props.name === vocabularyLang ? 'btn-success' : 'btn-info'
    return(
      <li onClick={this.props.handleChange} class={`btn ${activeClassName} btn-sm`} data-lang={this.props.name}>{this.props.name}</li>
    )
  }
}

export default Item
