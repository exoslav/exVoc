import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher'
//import featured from '../test-data/featured'
import { auth, db } from '../firebase'
import { user } from '../userState'
import { ls, checkLs } from '../helpers/local-storage'

class Store extends EventEmitter {
  constructor() {
    super()

    checkLs()

    this.currentLang = ls.getItem('activeLanguageItem')
    this.featuredList = [] // nastavi slovnik pri inicializaci
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

    let firebaseWordsList = db.ref(`users/${user.uid}/vocabularies/${lang}`).child('featuredList')

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

      this.featuredList = list
      this.total = this.featuredList.length

      this.emit('change')
    })
  }

  getAll() {
    return this.featuredList
  }

  changeItem(item, lang) {
    // check if item exists in featured list, if yes, we change it
    db.ref(`users/${user.uid}/vocabularies/${lang}/featuredList`).once('value', snapshot => {
      if (snapshot.hasChild(item.id)) {
        db.ref(`users/${user.uid}/vocabularies/${lang}/featuredList/${item.id}`).update(item.data)
      } else {
        console.log('item cannot be change in featured, because it does not exits')
      }
    })

    this.emit('change')
  }

  addItem(item, lang) {
    const wordList = db.ref(`users/${user.uid}/vocabularies/${lang}/featuredList/${item.id}`).set(item.data)

    this.emit('change')
  }

  deleteItem(id, lang) {
    db.ref(`users/${user.uid}/vocabularies/${lang}/featuredList/${id}`).remove()

    this.emit('change')
  }

  handleActions(action) {
    switch (action.actionType) {
      case 'ADD_ITEM_TO_FEATURED':
        this.addItem(action.item, action.lang)
        break;
      case 'DELETE_ITEM_FROM_FEATURED':
        this.deleteItem(action.item.id, action.lang)
        break;
      case 'CHANGE_ITEM_IN_FEATURED':
        this.changeItem(action.item, action.lang)
        break;
    }
  }
}

const FeaturedList = new Store

Dispatcher.register(FeaturedList.handleActions.bind(FeaturedList))

export default FeaturedList
