import React from 'react'
import Title from './header/Title'

class Header extends React.Component {
  handleOnFocus(e) {
    e.target.placeholder = ''
  }

  handleOnBlur(e) {
    e.target.placeholder = this.props.default
  }

  render() {
    return(
      <div class="container vocabulary-box">
        <a href="/">
          <img id="logo" src="./app/imgs/logo.png" />
        </a>

        <Title title={this.props.title} subtitle={this.props.subtitle} />
      </div>
    )
  }
}

export default Header
