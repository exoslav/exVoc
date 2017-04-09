import React from 'react'
import * as WordListActions from '../../actions/WordListActions'
import * as FeaturedWordsActions from '../../actions/FeaturedWordsActions'
import WordListStore from '../../stores/WordListStore'

class WordsListItem extends React.Component {
  constructor() {
    super()

    this.state = {
      editNameState: false,
      name: '',
      editDescState: false,
      desc: ''
    }

    this.item = {
      id: null,
      name: null,
      idiom: null,
      learned: null,
      featured: null,
      wordClass: null,
      description: null
    }

    this.lang = null
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
    const lang = this.lang
    const data = {
      id: this.item.id,
      featured: !this.item.featured
    }

    WordListActions.changeItem(data, lang)

    if(this.item.featured)
      FeaturedWordsActions.deleteItem(data.id, lang)
    else
      FeaturedWordsActions.addItem(this.item, lang)
  }

  handleLearned() {
    const lang = this.lang
    const data = {
      id: this.item.id,
      learned: !this.item.learned
    }

    WordListActions.changeItem(data, lang)
    FeaturedWordsActions.changeItem(data, lang)
  }

  handleEditName(e) {
    const data = {
      id: this.item.id,
      name: this.state.name
    }

    WordListActions.changeItem(data, 'CZ')
    FeaturedWordsActions.changeItem(data, 'CZ')
  }

  handleEditDesc(e) {
    const data = {
      id: this.item.id,
      description: this.state.desc
    }

    WordListActions.changeItem(data, 'CZ')
    FeaturedWordsActions.changeItem(data, 'CZ')
  }
  
  deleteItem() {
    WordListActions.deleteItem(this.item.id, this.lang)
    FeaturedWordsActions.deleteItem(this.item.id, this.lang)
  }

  changeEditStateName() {
    this.setState({
      editNameState: true,
      name: this.item.name
    })
  }

  changeEditStateDesc() {
    this.setState({
      editDescState: true,
      desc: this.item.description
    })
  }

  getNameVal(e) {
    this.setState({
      name: e.target.value
    })
  }

  getDescVal(e) {
    this.setState({
      desc: e.target.value
    })
  }

  render() {
    const item = this.item
    const lang = this.props.lang
    const layout = this.props.layout
    const { id, name, idiom, learned, featured, wordClass, description } = this.props.data

    item.id = id
    item.name = name
    item.idiom = idiom
    item.learned = learned
    item.featured = featured
    item.wordClass = wordClass
    item.description = description

    this.lang = lang

    let nameBlock = null
    let descBlock = null
    if(this.state.editNameState === true) {
      nameBlock = <div class="edit-item">
        <input
          type="text"
          value={this.state.name}
          onChange={this.getNameVal.bind(this)}
        />
        <button
          class="fa fa-pencil btn btn-xs btn-success"
          type="button"
          onClick={this.handleEditName.bind(this)}
        ></button>
      </div>
    } else {
      nameBlock = <strong onDoubleClick={this.changeEditStateName.bind(this)} class="name">{name}</strong>
    }

    if(this.state.editDescState === true) {
      descBlock = <div class="edit-item">
        <input
          type="text"
          value={this.state.desc}
          onChange={this.getDescVal.bind(this)}
        />
        <button
          class="fa fa-pencil btn btn-xs btn-success"
          type="button"
          onClick={this.handleEditDesc.bind(this)}
        ></button>
      </div>
    } else {
      descBlock = <span class="description" onDoubleClick={this.changeEditStateDesc.bind(this)}>{description}</span>
    }

    return(
      <div class={`${layout}`}>
        <div class={`item ${learned ? 'bg-success' : 'bg-danger'}`}>
          <dt class="wordlist-item">
            {nameBlock}
            {
              /*<strong onDoubleClick={this.changeEditState.bind(this)} class="name">{name}</strong>*/
            }
          </dt>
          <dd>
            {descBlock}
            {/*<span class="description">{description}</span>*/}

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
          </dd>
        </div>
      </div>
    )
  }
}

export default WordsListItem
