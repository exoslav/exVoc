import $ from 'jquery'
import React from 'react'
import InfoBox from '../components/InfoBox'
import WordsList from '../components/wordsList'
import Form from '../components/Form'
import LanguageMenu from '../components/LanguageMenu'
import FeaturedList from '../components/featuredList'

import WordListStore from '../stores/WordListStore'
import FeaturedListStore from '../stores/FeaturedList'

class Layout extends React.Component {
  constructor() {
    super()

    this.menuItems = [
      'CZ',
      'SK',
      'EN'
    ]

    this.vocabularyOpts = {
      langs: this.menuItems,
      activeLang: (() => {
        let activeItem

        if(localStorage.getItem('activeLanguageItem')) {
          activeItem = localStorage.getItem('activeLanguageItem')
        } else {
          localStorage.setItem('activeLanguageItem', this.menuItems[0])
          activeItem = this.menuItems[0]
        }

        return activeItem
      })()
    }

    this.state = {
      vocabularyLang: this.vocabularyOpts.activeLang,
      totalVocabulary: WordListStore.getTotal(),
      totalVocabularyLearned: WordListStore.getTotalLearned(),
      wordList: WordListStore.getAll(this.vocabularyOpts.activeLang),
      featuredWordsList: FeaturedListStore.getAll(this.vocabularyOpts.activeLang)
    }
  }

  componentWillMount() {
    FeaturedListStore.on('change', () => {
      this.setState({
        featuredWordsList: FeaturedListStore.getAll(this.state.vocabularyLang)
      })
    })

    WordListStore.on('change', () => {
      this.setState({
        wordList: WordListStore.getAll(this.state.vocabularyLang),
        totalVocabulary: WordListStore.getTotal(),
        totalVocabularyLearned: WordListStore.getTotalLearned()
      })
    })
  }

  changeVocabulary(lang) {
    this.setState({
      wordList: WordListStore.getAll(lang),
      featuredWordsList: FeaturedListStore.getAll(lang),
      vocabularyLang: lang
    })
  }

  render() {
    return(
      <div>
        <div id="vocabulary-header" class="bg-primary vocabulary-box">
          <div class="container">
            <div class="row">
              <div class="col-sm-6">
                <Form
                  lang={this.state.vocabularyLang}
                />
              </div>

              <div class="col-sm-6">
                <InfoBox
                  total={this.state.totalVocabulary}
                  totalLearned={this.state.totalVocabularyLearned}
                />
              </div>

              <div class="col-sm-6">
                <LanguageMenu
                  items={this.vocabularyOpts.langs}
                  activeItem={this.vocabularyOpts.activeLang}
                  changeLang={this.changeVocabulary.bind(this)}
                />
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <FeaturedList
            lang={this.state.vocabularyLang}
            items={this.state.featuredWordsList}
          />

          <WordsList
            lang={this.state.vocabularyLang}
            items={this.state.wordList}
          />
        </div>
      </div>
    )
  }
}

export default Layout
