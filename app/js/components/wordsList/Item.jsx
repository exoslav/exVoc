import React from 'react'
import * as WordListActions from '../../actions/WordListActions'
import * as FeaturedWordsActions from '../../actions/FeaturedWordsActions'
import WordListStore from '../../stores/WordListStore'

class WordsListItem extends React.Component {
  constructor() {
    super()

    this.item = {
      id: null,
      name: null,
      idiom: null,
      learned: null,
      featured: null,
      wordClass: null,
      description: null
    }
  }

  componentWillMount() {
    WordListStore.on('single-item-change', () => {
      this.setState({
        editNameState: false,
        editDescState: false
      })
    })
  }

  handleFeatured() {
    const item = {
      id: this.item.id,
      data: {
        featured: !this.item.featured
      }
    }
    const featuredType = this.item.featured ? 'deleteItem' : 'addItem'

    this.props.itemHandle(item, 'vocabulary', 'changeItem')

    if(featuredType === 'addItem') {
      item.data = this.item
      item.data.featured = !this.item.featured
    }

    this.props.itemHandle(item, 'featured', featuredType)
  }

  handleLearned() {
    const item = {
      id: this.item.id,
      data: {
        learned: !this.item.learned
      }
    }

    this.props.itemHandle(item, 'vocabulary', 'changeItem')
    this.props.itemHandle(item, 'featured', 'changeItem')
  }

  deleteItem() {
    const item = {
      id: this.item.id,
      data: {}
    }

    this.props.itemHandle(item, 'vocabulary', 'deleteItem')
    this.props.itemHandle(item, 'featured', 'deleteItem')
  }

  openModalWithItem(e) {
    this.props.openModal(this.item, 'editItem')
  }

  render() {
    const item = this.item
    const layout = this.props.layout
    const { id, name, idiom, learned, featured, wordClass, description } = this.props.data

    item.id = id
    item.name = name
    item.idiom = idiom
    item.learned = learned
    item.featured = featured
    item.wordClass = wordClass
    item.description = description

    return(
      <div class={`${layout}`}>
        <div class={`item ${learned ? 'bg-success' : 'bg-danger'}`}>
          <dt class="wordlist-item">
            <strong class="name">{name}</strong>
          </dt>
          <dd>
            <span class="description">{description}</span>

            {
              // DELETE ITEM
            }
            <button
              class="fa fa-trash-o btn btn-danger btn-xs pull-right"
              onClick={this.deleteItem.bind(this)}
              type="button"
              data-id={id}
            ></button>

            {
              // ADD/REMOVE FROM FEATURED
            }
            <button
              class={`fa ${this.item.featured ? 'fa-star': 'fa-star-o'} btn btn-primary btn-xs pull-right`}
              onClick={this.handleFeatured.bind(this)}
              type="button"
              data-id={id}
            ></button>

            {
              // SWITCH LEARN STATE
            }
            <button
              class={`fa fa-graduation-cap btn ${this.item.learned ? 'btn-success' : 'btn-danger'} btn-xs pull-right`}
              onClick={this.handleLearned.bind(this)}
              type="button"
              data-id={id}
            ></button>

            {
              // EDIT ITEM
            }
            <button
              class={`fa fa-edit btn btn-warning btn-xs pull-right`}
              onClick={this.openModalWithItem.bind(this)}
              type="button"
            ></button>
          </dd>
        </div>
      </div>
    )
  }
}

export default WordsListItem
