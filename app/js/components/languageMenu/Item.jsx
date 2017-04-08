import React from 'react'

class Item extends React.Component {
  render() {
    return(
      <li onClick={this.props.handleChange} class="btn bg-info btn-sm" data-lang={this.props.name}>{this.props.name}</li>
    )
  }
}

export default Item
