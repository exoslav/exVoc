import React from 'react'
import { Link } from 'react-router'

class MainNav extends React.Component {
  activeClass() {
    const className = 'active'
    const path = location.href
    const returnClassName = name => {
      var reg = new RegExp('/' + name, 'g');
      if(path.match(reg))
        return className
    }

    return {
      archives: () => returnClassName('archives'),
      settings: () => returnClassName('settings')
    }
  }

  actions() {
    return {
      backToHomepage: e => {
        e.preventDefault()
        this.props.router.push('/')
      }
    }
  }

  render() {
    const archiveActiveClassName = this.activeClass().archives()
    const settingsActiveClassName = this.activeClass().settings()

    return(
      <nav>
        <a onClick={this.actions().backToHomepage} href="/">Domů</a>
        <Link class={archiveActiveClassName} to="archives">Archives</Link>
        <Link class={settingsActiveClassName} to="settings">Settings</Link>
      </nav>
    )
  }
}

export default MainNav
