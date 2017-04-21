import React from 'react'

class EditItemModal extends React.Component {
  constructor(props) {
    super(props)

    const { name, description, learned, featured } = this.props.content
    this.state = this.props.content
  }

  changeItem(e) {
    let val = e.target.value
    const type = e.target.getAttribute('data-item-type')

    if(type === 'learned' || type === 'featured' || type === 'idiom') {
      val = JSON.parse(val)
    }

    this.setState({
      [type]: val
    })
  }

  close(e) {
    e.preventDefault()

    const item = {
      id: this.state.id,
      data: this.state
    }

    this.props.handleItem(item, 'vocabulary', 'changeItem')

    if(!this.state.featured) {
      this.props.handleItem(item, 'featured', 'deleteItem')
    } else {
      this.props.handleItem(item, 'featured', 'addItem')
    }

    this.props.closeModal()
  }

  render() {
    return(
      <div class="modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <form>
              <h2 class="modal-header">
                <input
                  class="form-control"
                  type="text"
                  data-item-type="name"
                  value={this.state.name}
                  onChange={this.changeItem.bind(this)}
                />
              </h2>

              <div class="modal-body">
                <textarea
                  class="form-control"
                  data-item-type="description"
                  value={this.state.description}
                  onChange={this.changeItem.bind(this)}
                />

                <br/>

                <table class="table table-striped table-condensed">
                  <thead>
                    <tr>
                      <th>&nbsp;</th>
                      <th>True</th>
                      <th>False</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Learned</td>
                      <td><input
                        type="radio"
                        name="learned"
                        value="true"
                        data-item-type="learned"
                        checked={this.state.learned === true}
                        onChange={this.changeItem.bind(this)}
                      /></td>
                      <td><input
                        type="radio"
                        name="learned"
                        value="false"
                        data-item-type="learned"
                        checked={this.state.learned === false}
                        onChange={this.changeItem.bind(this)}
                      /></td>
                    </tr>
                    <tr>
                      <td>Featured</td>
                      <td><input
                        type="radio"
                        name="featured"
                        value="true"
                        data-item-type="featured"
                        checked={this.state.featured === true}
                        onChange={this.changeItem.bind(this)}
                      /></td>
                      <td><input
                        type="radio"
                        name="featured"
                        value="false"
                        data-item-type="featured"
                        checked={this.state.featured === false}
                        onChange={this.changeItem.bind(this)}
                      /></td>
                    </tr>
                    <tr>
                      <td>Idiom</td>
                      <td><input
                        type="radio"
                        name="idiom"
                        value="true"
                        data-item-type="idiom"
                        checked={this.state.idiom === true}
                        onChange={this.changeItem.bind(this)}
                      /></td>
                      <td><input
                        type="radio"
                        name="idiom"
                        value="false"
                        data-item-type="idiom"
                        checked={this.state.idiom === false}
                        onChange={this.changeItem.bind(this)}
                      /></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="modal-footer">
                <button type="submit" class="btn btn-md bg-primary" onClick={this.close.bind(this)}>Zavřít</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default EditItemModal
