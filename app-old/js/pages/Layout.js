import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WordsList from '../components/wordsList'
import NewWordForm from '../components/NewWordForm'
import FeaturedList from '../components/featuredList'

class Layout extends React.Component {
  constructor() {
    super()
    this.langs = {
      TITLE: 'Slovíčkárno',
      PLACEHOLDER: 'Zde něco napište'
    }

    this.state = {
      title: this.langs.TITLE,
      placeholder: this.langs.PLACEHOLDER
    }
  }

  changeTitle(e) {
    let val = e.target.value

    this.setState({
      title: e.target.value
    })

    if(val.length === 0) {
      this.setState({
        title: this.langs.TITLE
      })
    }
  }

  render() {
    return(
      <div>
        <div class="container">
          <Header
            changeInputVal={this.changeTitle.bind(this)}
            title={this.state.title}
            default={this.state.placeholder}
            router={this.props.router}
          />

          <div class="row">
            <div class="col-sm-6">
              <NewWordForm />
            </div>

            <div class="col-sm-6">
              <FeaturedList />
            </div>

            <div class="col-sm-12">
              <WordsList />
            </div>
          </div>

          {/* this.props.children */}
        </div>

        <Footer/>
      </div>
    )
  }
}

export default Layout
