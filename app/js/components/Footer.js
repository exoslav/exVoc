import React from 'react'

class Footer extends React.Component {
  render() {
    return(
      <footer class="bg-info">
        <div class="container">
          <div class="resources">
            <img src="./app/imgs/webpack.png" alt="webpack" title="webpack" />
            <img src="./app/imgs/html.png" alt="HTML" title="HTML" />
            <img src="./app/imgs/css.png" alt="CSS" title="CSS" />
            <img src="./app/imgs/react.svg" alt="react" title="react" />
            <img src="./app/imgs/flux.png" alt="flux" title="flux" />
          </div>

          <div class="author">
            created by Martin Nikl (m.nikl@seznam.cz)
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
