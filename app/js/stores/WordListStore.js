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

  changeItem(data) {
    const list = this.wordList[lang]
    const temp = list.map(item => item.name === data.id)

    for(key in data) {
      if(data.hasOwnProperty(key))
        temp[0][key] = data[key]
    }

    console.log(temp)

    list.concat(temp)

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

  addItem(data) {
    const { name, description, wordClass, learned, idiom } = data

    this.wordList[data.lang].push({
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
        this.addItem(action.data)
        break;
      case 'DELETE_WORDLIST_ITEM':
        this.deleteItem(action.id, action.lang)
        break;
    }
  }
}

const WordListStore = new Store

Dispatcher.register(WordListStore.handleActions.bind(WordListStore))

export default WordListStore
