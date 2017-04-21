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
    let currentLang = ls.getItem('activeLanguageItem')

    this.featuredList = {CZ: []}
    this.total = null

    auth.onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
        const list = []
        let firebaseWordsList = db.ref(`users/${firebaseUser.uid}/${currentLang}`).child('featuredList')

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

          this.featuredList = {[currentLang]: list}
          this.total = this.featuredList[currentLang].length

          this.emit('change')
        })
      } else {
        console.log('store not logged in')
      }
    })
  }

  getAll(lang) {
    return this.featuredList[lang]

    this.emit('change')
  }

  changeItem(item, lang) {
    // check if item exists in featured list, if yes, we change it
    db.ref(`users/${user.uid}/featuredList`).once('value', snapshot => {
      if (snapshot.hasChild(item.id)) {
        db.ref(`users/${user.uid}/featuredList/${item.id}`).update(item.data)
      } else {
        console.log('item cannot be change in featured, because it does not exits')
      }
    })

    this.emit('change')
  }

  addItem(item, lang) {
    console.log(item)
    const wordList = db.ref(`users/${user.uid}/featuredList/${item.id}`).set(item.data)

    this.emit('change')
  }

  deleteItem(id, lang) {
    db.ref(`users/${user.uid}/featuredList/${id}`).remove()

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
