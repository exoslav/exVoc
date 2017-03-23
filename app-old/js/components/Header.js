import React from 'react'
import Title from './header/Title'
import MainNav from './MainNav'

class Header extends React.Component {
  handleOnFocus(e) {
    e.target.placeholder = ''
  }

  handleOnBlur(e) {
    e.target.placeholder = this.props.default
  }

  render() {
    return(
      <header>
        <Title title={this.props.title} />
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
      </header>
    )
  }
}

export default Header
