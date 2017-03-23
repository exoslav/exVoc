import React from 'react'
import articles from './articles'

class Archives extends React.Component {
  render() {
    // const latestNews = []
    // Object.keys(articles).forEach((key) => {
    //   latestNews.push(<key key=`${key}`/>)
    // })
    // const latestNews = articles.map((article, i) => <article key={i} />)

    return(
      <div>
        <h2>Archives</h2>

        <strong>
          {articles}
          Článek:<br/>
          Latest news
          {this.props.params.article}
        </strong>
      </div>
    )
  }
}

export default Archives
