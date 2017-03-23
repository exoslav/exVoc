import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher'

class Store extends EventEmitter {
  constructor() {
    super()

    this.FeaturedWords = [
      {
        id: 78942,
        name: 'Běhat',
        content: 'To run, running',
        wordType: 2
      },
      {
        id: 8762,
        name: 'Vařit',
        content: 'To cook, cooking',
        wordType: 2
      },
      {
        id: 467818,
        name: 'Jíst',
        content: 'to eat, eating',
        wordType: 2
      }
    ]
  }

  addFeaturedItem(data) {
    this.featuredWords.push({
      id: Date.now(),
      name: data.name,
      content: data.content,
      wordType: 2
    })

    this.emit('change')
  }

  deleteFeaturedItem() {

    this.emit('change')
  }

  handleActions(action) {
    switch (action.actionType) {
      case 'ADD_FEATURED_ITEM':
        this.addFeaturedItem(action.data)
        break;
      default:
      case 'DELETE_FEATURED_ITEM':

        break;
      default:

    }
  }
}

const FeaturedWords = new Store

Dispatcher.register(FeaturedWords.handleActions.bind(this))

export default FeaturedWords
