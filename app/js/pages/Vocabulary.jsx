import $ from 'jquery'
import React from 'react'
import InfoBox from '../components/InfoBox'
import WordsList from '../components/wordsList'
import Form from '../components/Form'
import LanguageMenu from '../components/LanguageMenu'
import itemActions from '../itemActions'
import FeaturedList from '../components/featuredList'
import WordListStore from '../stores/WordListStore'
import FeaturedListStore from '../stores/FeaturedList'
import Modal from '../components/Modals/DefaultModal'
import EditItemModal from '../components/Modals/EditItemModal'
import * as WordListActions from '../actions/WordListActions'
import * as FeaturedWordsActions from '../actions/FeaturedWordsActions'
import { ls } from '../helpers/local-storage'

import { auth } from '../firebase'
class Layout extends React.Component {
  constructor() {
    super()

    this.defaultLang = 'CZ'
    this.menuItems = [
      'CZ',
      'SK',
      'EN'
    ]

    this.vocabularyLang = this.getVocabularyLang()
    this.modalContent = null
    this.itemActions = itemActions

    this.state = {
      vocabularyLang: this.vocabularyLang,
      totalVocabulary: WordListStore.getTotal(),
      totalVocabularyLearned: WordListStore.getTotalLearned(),
      wordList: WordListStore.getAll('CZ'),
      featuredWordsList: FeaturedListStore.getAll('CZ'),
      modalOpen: false
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

  getVocabularyLang() {
    return ls.getItem('activeLanguageItem') || this.defaultLang
  }

  changeVocabulary(lang) {
    this.vocabularyLang = lang
    ls.setItem('activeLanguageItem', this.vocabularyLang)
    this.setState({
      wordList: WordListStore.getAll(this.vocabularyLang),
      featuredWordsList: FeaturedListStore.getAll(this.vocabularyLang),
      vocabularyLang: this.vocabularyLang
    })
  }

  handleItem(item, type, action) {
    this.itemActions[type][action](item, this.state.vocabularyLang)
  }

  openModal(content, type) {
    this.modalType = type
    this.modalContent = content
    this.setState({
      modalOpen: true
    })
  }

  closeModal(item, type, action) {
    this.modalContent = null
    this.setState({
      modalOpen: false
    })
  }

  render() {
    let modal = null
    if(this.state.modalOpen) {
      switch (this.modalType) {
        case 'editItem':
          modal = <EditItemModal
            content={this.modalContent}
            closeModal={this.closeModal.bind(this)}
            handleItem={this.handleItem.bind(this)}
          />
          break;
        default:
          modal = <DefaultModal
            content={this.modalContent}
            closeModal={this.closeModal.bind(this)}
            handleItem={this.handleItem.bind(this)}
          />
      }
    } else {
      modal = <div/>
    }

    return(
      <div>
        {modal}
        <div id="vocabulary-header" class="bg-primary vocabulary-box">
          <div class="container">
            <div class="row">
              <div class="col-sm-6">
                <Form
                  itemHandle={this.handleItem.bind(this)}
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
                  items={this.menuItems}
                  activeItem={this.state.vocabularyLang}
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
            itemHandle={this.handleItem.bind(this)}
          />

          <WordsList
            items={this.state.wordList}
            itemHandle={this.handleItem.bind(this)}
            openModal={this.openModal.bind(this)}
          />
        </div>
      </div>
    )
  }
}

export default Layout
