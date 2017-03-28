import React from 'react'
import * as WordListActions from '../actions/WordListActions'
import * as FeaturedWordsActions from '../actions/FeaturedWordsActions'

class Form extends React.Component {
  constructor() {
    super()

    this.state = {
      name: null,
      wordClass: 0,
      description: null,
      idiom: false,
      learned: false,
      featured: false
    }
  }

  submitForm(e) {
    e.preventDefault()

    const data = this.state

    WordListActions.createItem(data, this.props.lang)

    if(this.state.featured)
      FeaturedWordsActions.addItem(data, this.props.lang)
  }

  handleFormChange(e) {
    let val = null
    const target = e.target
    const type = target.type
    const name = target.name

    switch (type) {
      case 'checkbox':
        val = target.checked
        break
      default:
        val = target.value
        break
    }

    this.setState({
      [name]: val
    })
  }

  render() {
    return(
      <form
        class="form clearfix"
        onSubmit={this.submitForm.bind(this)}
      >
        <div class="row">
          <div class="form-group col-xs-6">
            <label for="create-to-do-item-name">Name of the new word</label>
            <input
              id="create-to-do-item-name"
              class="form-control"
              name="name"
              onChange={this.handleFormChange.bind(this)}
            />
          </div>

          <div class="form-group col-xs-6">
            <label for="create-to-do-item-name">Word class</label>
            <select
              id="create-to-do-item-wordclass"
              class="form-control"
              name="wordClass"
              onChange={this.handleFormChange.bind(this)}
            >
                <option value="0">Not selected</option>
                <option value="1">1. Substantiva</option>
                <option value="2">2. Adjectives</option>
                <option value="3">3. Pronomina</option>
                <option value="4">4. Numeralia</option>
                <option value="5">5. Verba</option>
                <option value="6">6. Adverbia</option>
                <option value="7">7. Prepozice</option>
                <option value="8">8. Konjunkce</option>
                <option value="9">9. Partikule</option>
                <option value="10">10. Interjekce</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="create-to-do-item-content">Description of the new word</label>
          <input
            id="create-to-do-item-content"
            class="form-control"
            name="description"
            onChange={this.handleFormChange.bind(this)}
          />
        </div>

        <div class="row">
          <div class="col-xs-3">
            <div class="checkbox">
              <label for="create-to-do-item-idiom">
                <input
                  id="create-to-do-item-idiom"
                  type="checkbox"
                  name="idiom"
                  onChange={this.handleFormChange.bind(this)}
                />
                  Is idiom
              </label>
            </div>
          </div>

          <div class="col-xs-3">
            <div class="checkbox">
              <label for="create-to-do-item-learned">
                <input
                  id="create-to-do-item-learned"
                  type="checkbox"
                  name="learned"
                  onChange={this.handleFormChange.bind(this)}
                />
                  Learned
              </label>
            </div>
          </div>

          <div class="col-xs-3">
            <div class="checkbox">
              <label for="create-to-do-item-featured">
                <input
                  id="create-to-do-item-featured"
                  type="checkbox"
                  name="featured"
                  onChange={this.handleFormChange.bind(this)}
                />
                  Featured
              </label>
            </div>
          </div>
        </div>

        <button
          class="btn btn-info pull-right"
          type="submit"
        >
          Add new word to vocabulary
        </button>
      </form>
    )
  }
}

export default Form
