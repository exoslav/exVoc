import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher'
import featured from '../test-data/featured'

class Store extends EventEmitter {
  constructor() {
    super()

    this.featuredList = featured
  }

  getAll(lang) {
    return this.featuredList[lang]

    this.emit('change')
  }

  addItem(data, lang) {
    const { name, description, learned, wordClass } = data

    this.featuredList[lang].push({
      id: Date.now(),
      name,
      description,
      learned,
      wordClass
    })

    this.emit('change')
  }

  deleteItem(id, lang) {
    const list = this.featuredList[lang]
    const newList = list.filter(item => item.id === id ? false : true)

    this.featuredList[lang] = newList

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
    }
  }
}

const FeaturedList = new Store

Dispatcher.register(FeaturedList.handleActions.bind(FeaturedList))

export default FeaturedList
