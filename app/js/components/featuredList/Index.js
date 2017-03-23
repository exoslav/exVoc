import React from 'react'
import Item from './Item'

class FeaturedList extends React.Component {
  render() {
    const items = this.props.items.map((item, i) => <Item
      data={item}
      key={i}
      delete={this.props.delete}
    />)

    return(
      <div id="featured-list" class="bg-info vocabulary-box">
        <h3>Featured words</h3>

        <dl class="row">
          {items}
        </dl>
      </div>
    )
  }
}

export default FeaturedList
