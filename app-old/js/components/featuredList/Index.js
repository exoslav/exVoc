import React from 'react'
import Item from './Item'

class FeaturedList extends React.Component {
  constructor() {
    super()
  }

  render() {
    return(
      <div id="featured-vocabulary">
        <h3>Featured words</h3>
        <dl>
          <Item />
        </dl>
      </div>
    )
  }
}

export default FeaturedList
