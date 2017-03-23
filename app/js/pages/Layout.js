import $ from 'jquery'
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import InfoBox from '../components/InfoBox'
import WordsList from '../components/wordsList'
import NewWordForm from '../components/NewWordForm'
import LanguageMenu from '../components/LanguageMenu'
import FeaturedList from '../components/featuredList'
import * as WordListActions from '../actions/WordListActions'
import * as FeaturedWordsActions from '../actions/FeaturedWordsActions'

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

    this.langs = {
      TITLE: 'Slovíčkárno',
      SUBTITLE: 'prostě pro slovíčka'
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

  addWordListItem() {
    let name = document.getElementById('create-to-do-item-name')
    let content = document.getElementById('create-to-do-item-content')
    let wordClass = document.getElementById('create-to-do-item-wordclass')
    let learned = document.getElementById('create-to-do-item-learned')
    let idioms = document.getElementById('create-to-do-item-idiom')

    let valid = true
    if(name.value === '') {
      $(name).addClass('invalid')
      valid = false
    } else {
      $(name).removeClass('invalid')
    }

    if(content.value === '') {
      $(content).addClass('invalid')
      valid = false
    } else {
      $(content).removeClass('invalid')
    }

    if(!valid)
      return

    WordListActions.createTodo({
      name: name.value,
      content: content.value,
      wordClass: parseInt(wordClass.value),
      learned: learned.checked,
      idioms: idioms.checked,
      lang: this.state.vocabularyLang
    })
  }

  deleteWordListItem(e) {
    const id = e.target.getAttribute('data-id')
    WordListActions.deleteWordListItem(id, this.state.vocabularyLang)
  }

  addFeaturedWordsItem(e) {
    let name = document.getElementById('create-featured-item-name').value
    let content = document.getElementById('create-featured-item-content').value

    FeaturedWordsActions.addFeaturedItem({
      name,
      content,
      lang: this.state.vocabularyLang
    })
  }

  deleteFeaturedWordsItem(e) {
    const id = e.target.getAttribute('data-id')
    FeaturedWordsActions.deleteFeaturedItem(id, this.state.vocabularyLang)
  }

  render() {
    return(
      <div>
        <header class="bg-info">
          <Header title={this.langs.TITLE} subtitle={this.langs.SUBTITLE} />
        </header>

        <div id="vocabulary-header" class="bg-primary vocabulary-box">
          <div class="container">
            <div class="row">
              <div class="col-sm-6">
                <NewWordForm
                  createItem={this.addWordListItem.bind(this)}
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
            items={this.state.featuredWordsList}
            delete={this.deleteFeaturedWordsItem.bind(this)}
            add={this.addFeaturedWordsItem.bind(this)}
          />

          <WordsList
            items={this.state.wordList}
            delete={this.deleteWordListItem.bind(this)}
          />
        </div>

        <Footer/>
      </div>
    )
  }
}

export default Layout
