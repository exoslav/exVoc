import React from 'react'

class InfoBox extends React.Component {
  render() {
    return(
      <section>
        <div>
          <strong>
            Total words:&nbsp;
          </strong>

          <span>
            {this.props.total}
          </span>
        </div>

        <div>
          <strong>
            Total words learned:&nbsp;
          </strong>

          <span>
            {this.props.totalLearned}
          </span>
        </div>
      </section>
    )
  }
}

export default InfoBox
