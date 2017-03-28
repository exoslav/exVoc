import { EventEmitter } from 'events'
import Dispatcher from '../dispatcher'
import vocabulary from '../test-data/vocabulary'

class Store extends EventEmitter {
  constructor() {
    super()

    this.wordList = vocabulary

    this.totalLearned = (() => {
      let total = 0
      const list = this.wordList

      for (let i = 0; i < this.wordList.length; i++) {
        if(list[i].learned)
          total++
      }

      return total
    })()

    this.total = this.wordList.length
  }

  getTotalLearned() {
    return this.totalLearned
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
    const currentList = this.wordList[lang]
    const newList = currentList.map(item => {
      if(item.id === data.id) {
        for(let key in data) {
          if(data.hasOwnProperty(key))
            item[key] = data[key]
        }
      }

      return item
    })

    this.wordList[lang] = newList

    this.emit('change')
    // this.emit('singleItemChange')
  }

  updateState(opts) {
    if(opts.addItem)
      this.total++
    else
      this.total--

    if(!opts.isLearned)
      this.totalLearned--
  }

  addItem(data, lang) {
    const { name, description, wordClass, learned, idiom } = data

    this.wordList[lang].push({
      id: Date.now(),
      name,
      description,
      wordClass,
      learned,
      idiom
    })

    this.updateState({
      addItem: true,
      deleteItem: false,
      isLearned: false
    })

    this.emit('change')
  }

  deleteItem(id, lang) {
    let learned
    const list = this.wordList[lang]

    for(let i = 0; i < list.length; i++) {
      if(list[i].id === parseInt(id)) {
        learned = list[i].learned ? true : false

        list.splice(i, 1)
      }
    }

    this.updateState({
      addItem: false,
      deleteItem: true,
      isLearned: learned
    })

    this.emit('change')
  }

  handleActions(action) {
    switch (action.actionType) {
      case 'CREATE_WORDLIST_ITEM':
        this.addItem(action.data, action.lang)
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
