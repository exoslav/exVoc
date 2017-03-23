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
        <img id="logo" src="./app/imgs/logo.png" />
        <Title title={this.props.title} subtitle={this.props.subtitle} />
        {/*
        <input
          class="form-control"
          placeholder={this.props.default}
          onFocus={this.handleOnFocus.bind(this)}
          onBlur={this.handleOnBlur.bind(this)}
          onChange={this.props.changeInputVal}
        />

        <MainNav router={this.props.router} />
        */}
      </div>
    )
  }
}

export default Header
