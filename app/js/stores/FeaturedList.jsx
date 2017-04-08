import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher'
//import featured from '../test-data/featured'
import { auth, db } from '../firebase'
import { user } from '../userState'

class Store extends EventEmitter {
  constructor() {
    super()

    this.featuredList = {CZ: []}
    this.total = null

    auth.onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
        const list = []
        let firebaseWordsList = db.ref(`users/${firebaseUser.uid}`).child('featuredList')
        
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

          this.featuredList = {CZ: list}
          this.total = this.featuredList['CZ'].length

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

  changeItem(data, lang) {
    // check if item exists in featured list, if yes, we change it
    db.ref(`users/${user.uid}/featuredList`).once('value', snapshot => {
      if (snapshot.hasChild(data.id)) {
        db.ref(`users/${user.uid}/featuredList/${data.id}`).update(data)
      } else {
        console.log('item cannot be change in featured, because it does not exits')
      }
    })

    this.emit('change')
  }

  addItem(data, lang) {
    const wordList = db.ref(`users/${user.uid}/featuredList/${data.id}`).set(data)

    this.emit('change')
  }

  deleteItem(id, lang) {
    db.ref(`users/${user.uid}/featuredList/${id}`).remove()

    this.emit('change')
  }

  handleActions(action) {
    switch (action.actionType) {
      case 'ADD_FEATURED_ITEM':
        this.addItem(action.data, action.lang)
        break;
      case 'DELETE_FEATURED_ITEM':
        this.deleteItem(action.id, action.lang)
        break;
      case 'CHANGE_FEATURED_ITEM':
        this.changeItem(action.data, action.lang)
        break;
    }
  }
}

const FeaturedList = new Store

Dispatcher.register(FeaturedList.handleActions.bind(FeaturedList))

export default FeaturedList
