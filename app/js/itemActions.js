import React from 'react'
import * as WordListActions from './actions/WordListActions'
import * as FeaturedWordsActions from './actions/FeaturedWordsActions'

const itemActions = {
  featured: {
    addItem: FeaturedWordsActions.addItem,
    deleteItem: FeaturedWordsActions.deleteItem,
    changeItem: FeaturedWordsActions.changeItem
  },
  vocabulary: {
    createItem: WordListActions.createItem,
    deleteItem: WordListActions.deleteItem,
    changeItem: WordListActions.changeItem
  }
}

export default itemActions
