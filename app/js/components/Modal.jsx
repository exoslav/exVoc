import React from 'react'

class Modal extends React.Component {
  render() {
    return(
      <div id="modal-opened">
        <div class="container">
          <h2 class="modal-header">
            {this.props.content.header}
          </h2>

          <div class="modal-body">
            {this.props.content.body}
          </div>

          <div class="modal-footer">
            {this.props.content.footer}
            <button type="button" onClick={this.props.closeModal}>Zavřít</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
