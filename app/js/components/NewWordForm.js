import React from 'react'

class NewWordForm extends React.Component {
  constructor() {
    super()

    this.state = {

    }
  }

  render() {
    return(
      <form class="form clearfix">
        <div class="row">
          <div class="form-group col-xs-6">
            <label for="create-to-do-item-name">Name of the new word</label>
            <input id="create-to-do-item-name" class="form-control" />
          </div>

          <div class="form-group col-xs-6">
            <label for="create-to-do-item-name">Word class</label>
            <select id="create-to-do-item-wordclass" class="form-control">
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
          <input id="create-to-do-item-content" class="form-control" />
        </div>

        <div class="row">
          <div class="col-xs-3">
            <div class="checkbox">
              <label for="create-to-do-item-idiom">
                <input id="create-to-do-item-idiom" type="checkbox" />Is idiom
              </label>
            </div>
          </div>

          <div class="col-xs-3">
            <div class="checkbox">
              <label for="create-to-do-item-learned">
                  <input id="create-to-do-item-learned" type="checkbox" />Learned
              </label>
            </div>
          </div>

          <div class="col-xs-3">
            <div class="checkbox">
              <label for="create-to-do-item-featured">
                  <input id="create-to-do-item-featured" type="checkbox" />Featured
              </label>
            </div>
          </div>
        </div>

        <button
          class="btn btn-info pull-right"
          onClick={this.props.createItem.bind(this)} type="button"
        >
          Add new word to vocabulary
        </button>
      </form>
    )
  }
}

export default NewWordForm
