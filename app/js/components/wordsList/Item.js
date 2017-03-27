import React from 'react'

class WordsListItem extends React.Component {
  constructor(props) {
    super(props)

    const { name, description, id, learned, idiom, wordClass } = this.props.data

    this.state = {
      id,
      name,
      idiom,
      learned,
      wordClass,
      description,
      lang: this.props.lang,
    }
  }

  addFeatured(e) {
    this.props.FeaturedWordsActions.addFeaturedItem(this.state)
  }

  render() {
    const layout = this.props.layout
    const { name, description, id, learned } = this.state
    const learnedClassName = learned ? 'bg-success' : 'bg-danger'

    return(
      <div class={`${layout}`}>
        <div class={`item ${learnedClassName}`}>
          <dt class="wordlist-item">
            <strong class="name">{name}</strong>
          </dt>
          <dd>
            <span class="description">{description}</span>
            <button
              class="fa fa-trash-o btn btn-danger btn-xs pull-right"
              onClick={this.props.deleteItem}
              type="button"
              data-id={id}
            ></button>

            <button
              class="fa fa-graduation-cap btn btn-danger btn-xs pull-right"
              type="button"
              data-id={id}
            ></button>

            <button
              class="fa fa-star btn btn-warning btn-xs pull-right"
              onClick={this.addFeatured.bind(this)}
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
