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
    let currentLang = ls.getItem('activeLanguageItem')

    this.wordList = {[currentLang]: []}
    this.total = null

    auth.onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
        const list = []
        let firebaseWordsList = db.ref(`users/${firebaseUser.uid}/${currentLang}`).child('wordList')

        firebaseWordsList.on('value', snapshot => {
          // clear list
          list.splice(0, list.length)

          // firebase data
          const data = snapshot.val()

          // from firebase object to array
          Object.keys(data).forEach(item => {
            data[item].id = item
            list.push(data[item])
          })

          this.wordList = {[currentLang]: list}
          this.total = this.wordList[currentLang].length

          this.emit('change')
        })
      } else {
        console.log('store not logged in')
      }
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
    return this.wordList[lang]
  }

  // returns undefined if not matches
  getSingle(id, lang) {
    return this.wordList[lang].find(item => item.id === id ? item : false)
  }

  changeItem(item, lang) {
    db.ref(`users/${user.uid}/${lang}/wordList/${item.id}`).update(item.data)

    this.emit('change')
    this.emit('single-item-change')
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
    db.ref(`users/${user.uid}/${vocabularyLang}/wordList`).push(item)
    .then(res => {
      // add item id as a callback
      db.ref(`users/${user.uid}/${vocabularyLang}/wordList/${res.getKey()}`).update({id: res.getKey()})

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
    db.ref(`users/${user.uid}/${lang}/wordList/${id}`).remove()

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
