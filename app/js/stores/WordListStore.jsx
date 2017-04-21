import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher'
// import vocabulary from '../test-data/vocabulary'
import { auth, db } from '../firebase'
import { user, vocabularyLang } from '../userState'
import * as FeaturedWordsActions from '../actions/FeaturedWordsActions'
import { ls, checkLs } from '../helpers/local-storage'

class Store extends EventEmitter {
  constructor() {
    super()

    checkLs()

    this.currentLang = ls.getItem('activeLanguageItem')
    this.wordList = [] // nastavi slovnik pri inicializaci
    this.total = null

    auth.onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
        this.getVocabulary(this.currentLang, firebaseUser)
      } else {
        console.log('store not logged in')
      }
    })
  }

  getVocabulary(lang, user) {
    const list = []

    let firebaseWordsList = db.ref(`users/${user.uid}/vocabularies/${lang}`).child('wordList')

    firebaseWordsList.on('value', snapshot => {
      // clear list
      list.splice(0, list.length)

      // firebase data
      const data = snapshot.val()

      // from firebase object to array
      if(data !== null) {
        Object.keys(data).forEach(item => {
          data[item].id = item
          list.push(data[item])
        })
      }

      this.wordList = list
      this.total = this.wordList.length

      this.emit('change')
    })
  }

  getTotalLearned() {
    return 0
    //return this.totalLearned
  }

  getTotal() {
    return this.total
  }

  getAll(lang) {
    return this.wordList
  }

  // returns undefined if not matches
  getSingle(id, lang) {
    return this.wordList.find(item => item.id === id ? item : false)
  }

  changeItem(item, lang) {
    db.ref(`users/${user.uid}/vocabularies/${lang}/wordList/${item.id}`).update(item.data)

    this.emit('change')
  }

  updateState(opts) {
    if(opts.addItem)
      this.total++
    else
      this.total--

    if(!opts.isLearned)
      this.totalLearned--
  }

  addItem(item, lang) {
    db.ref(`users/${user.uid}/vocabularies/${lang}/wordList`).push(item)
    .then(res => {
      // add item id as a callback
      db.ref(`users/${user.uid}/vocabularies/${lang}/wordList/${res.getKey()}`).update({id: res.getKey()})

      if(!item.featured)
        return

      // create item in featured with the same KEY TOKEN (notw both items has the same id)
      const featured = {
        id: res.getKey(),
        data: item
      }
      featured.data.id = res.getKey()
      FeaturedWordsActions.addItem(featured, 'CZ')
    })

    this.emit('change')
  }

  deleteItem(id, lang) {
    db.ref(`users/${user.uid}/vocabularies/${lang}/wordList/${id}`).remove()

    this.emit('change')
  }

  handleActions(action) {
    switch (action.actionType) {
      case 'CREATE_ITEM_IN_WORDLIST':
        this.addItem(action.item, action.lang)
        break;
      case 'DELETE_ITEM_FROM_WORDLIST':

        this.deleteItem(action.item.id, action.lang)
        break;
      case 'CHANGE_ITEM_IN_WORDLIST':
        this.changeItem(action.item, action.lang)
        break;
    }
  }
}

const WordListStore = new Store

Dispatcher.register(WordListStore.handleActions.bind(WordListStore))

export default WordListStore
