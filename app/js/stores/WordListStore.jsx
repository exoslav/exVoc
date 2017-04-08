import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher'
// import vocabulary from '../test-data/vocabulary'
import { auth, db } from '../firebase'
import { user } from '../userState'
import * as FeaturedWordsActions from '../actions/FeaturedWordsActions'

class Store extends EventEmitter {
  constructor() {
    super()

    this.wordList = {CZ: []}
    this.total = null

    auth.onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
        const list = []
        let firebaseWordsList = db.ref(`users/${firebaseUser.uid}`).child('wordList')
        
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

          this.wordList = {CZ: list}
          this.total = this.wordList['CZ'].length

          this.emit('change')
        })
      } else {
        console.log('store not logged in')
      }
    })
  }

  setWordList(data) {
    this.wordList = data
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

  changeItem(data, lang) {
    db.ref(`users/${user.uid}/wordList/${data.id}`).update(data)

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

  addItem(data, lang, isFeatured) {
    db.ref(`users/${user.uid}/wordList`).push(data)
    .then(item => {
      if(!isFeatured)
        return

      console.log('adding featured')
      // create item in featured with the same KEY TOKEN (notw both items has the same id)
      const featuredItemData = data
      featuredItemData.id = item.getKey()
      FeaturedWordsActions.addItem(featuredItemData, 'CZ')
    })

    this.emit('change')
  }

  deleteItem(id, lang) {
    db.ref(`users/${user.uid}/wordList/${id}`).remove()

    this.emit('change')
  }

  handleActions(action) {
    switch (action.actionType) {
      case 'CREATE_WORDLIST_ITEM':
        this.addItem(action.data, action.lang, action.isFeatured)
        break;
      case 'DELETE_WORDLIST_ITEM':
        this.deleteItem(action.id, action.lang)
        break;
      case 'CHANGE_WORDLIST_ITEM':
        this.changeItem(action.data, action.lang)
        break;
    }
  }
}

const WordListStore = new Store

Dispatcher.register(WordListStore.handleActions.bind(WordListStore))

export default WordListStore
