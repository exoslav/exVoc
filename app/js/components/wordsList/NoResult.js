import React from 'react'

class NoResult extends React.Component {
  render() {
    return(
      <div class="no-results col-xs-12 text-center">
        <div class="wrapper bg-danger vocabulary-box">
          <h2>Oops!</h2>
          <h4>There are no words found.<br/> Try to add some new words and learn them!</h4>
          <img src="./app/imgs/no-result.png" />
        </div>
      </div>
    )
  }
}

export default NoResult
