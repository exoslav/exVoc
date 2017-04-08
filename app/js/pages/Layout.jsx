import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SessionBlock from '../components/SessionBlock'
import { auth } from '../firebase'
import { user, setUser } from '../userState'

class Layout extends React.Component {
  constructor() {
    super()

    this.langs = {
      TITLE: 'Slovíčkárno',
      SUBTITLE: 'prostě pro slovíčka'
    }
  }

  render() {
    let block = null
    if(user) {
      block = <SessionBlock />
    } else {
      block = <div />
    }

    return(
      <div>
        {block}
        
        <header class="bg-info">
          <Header title={this.langs.TITLE} subtitle={this.langs.SUBTITLE} />
        </header>

        {this.props.children}
        
        <Footer/>
      </div>
    )
  }
}

export default Layout
