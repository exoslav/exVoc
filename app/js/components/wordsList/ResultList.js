import React from 'react'

class List extends React.Component {
  render() {
    return(
      <dl class="dl-horizontal">
        {this.props.items}
      </dl>
    )
  }
}

export default List
