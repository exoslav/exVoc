import React from 'react'

class Item extends React.Component {
  render() {
    return(
      <div>
        <dt class="to-do-list-item">
          <strong>featured name</strong>
        </dt>
        <dd>
          <span>featured content</span>
          <button class="btn btn-info btn-xs" type="button" data-id="1">+</button>
          <button class="btn btn-danger btn-xs" type="button" data-id="1">X</button>
        </dd>
      </div>
    )
  }
}

export default Item
