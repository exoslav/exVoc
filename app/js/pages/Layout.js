import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

class Layout extends React.Component {
  constructor() {
    super()

    this.langs = {
      TITLE: 'Slovíčkárno',
      SUBTITLE: 'prostě pro slovíčka'
    }
  }

  render() {
    return(
      <div>
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
