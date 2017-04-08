import $ from 'jquery'
import React from 'react'
import WordsListItem from './Item'
import NoResult from './NoResult'
import ResultList from './ResultList'
import deepObjectCopy from '../../helpers/deepObjectCopy'

class WordList extends React.Component {
  constructor() {
    super()

    this.state = {
      layout: 'col-xs-12',
      filter: {
        wordClass: [],
        other: []
      }
    }
  }

  handleActiveClassOnFilterMenu(e) {
    if(e.target.getAttribute('data-filter-type') === 'layout') {
      $('.layout-filter button').removeClass('active bg-primary').addClass('bg-info')
      $(e.target).addClass('active bg-primary').removeClass('bg-info')
    } else {
      if($(e.target).hasClass('active')) {
        $(e.target).removeClass('active bg-primary').addClass('bg-info')
      } else {
        $(e.target).removeClass('bg-info').addClass('active bg-primary')
      }
    }
  }

  changeLayout(e) {
    this.handleActiveClassOnFilterMenu(e)
    const layout = e.target.getAttribute('data-layout')

    this.setState({
      layout
    })
  }

  setFilter(e) {
    this.handleActiveClassOnFilterMenu(e)

    let val = e.target.getAttribute('data-filter-value')
    const type = e.target.getAttribute('data-filter-type')

    if(type === 'wordClass') {
      val = parseInt(val)
    }

    let newFilter = deepObjectCopy(this.state.filter)
    const index = newFilter[type].indexOf(val)

    if(index > -1) {
      newFilter[type].splice(index, 1)
    } else {
      newFilter[type] = newFilter[type].concat([val])
    }

    this.setState({
      filter: newFilter
    })
  }

  render() {
    const items = this.props.items
    const filter = this.state.filter

    const inArray = (filter, item) => filter.indexOf(item) > -1 ? true : false
    const emptyArray = array => array.length === 0 ? true : false
    const wordClassFilter = (items, filter) => {
      if(emptyArray(filter))
        return items

      return items.filter(item => inArray(filter, item.wordClass))
    }
    const otherFilter = (items, filter) => {
      return items.filter(item => {
        let state = true
        for (let i = 0; i < filter.length; i++) {
          if(!item[filter[i]])
            state = false
        }

        return state
      })
    }

    const wordClassItems = wordClassFilter(items, filter['wordClass'])
    const otherItems = otherFilter(wordClassItems, filter['other'])
    const filteredItems = otherItems

    let block
    if(filteredItems.length === 0) {
      block = <NoResult />
    } else {
      const WordList = filteredItems.map(item => <WordsListItem
        key={item.id}
        data={item}
        lang={this.props.lang}
        layout={this.state.layout}
      />)

      block = <ResultList items={WordList} />
    }


    return(
      <div id="vocabulary-list">
        <div class="vocabulary-filter clearfix">
          <ul class="list-unstyled">
            <li class="layout-filter">
              <strong>Layout:</strong>
              <ul class="list-unstyled">
                <li><button onClick={this.changeLayout.bind(this)} class="btn bg-primary active btn-xs" data-filter-type="layout" data-layout="col-xs-12">1 column</button></li>
                <li><button onClick={this.changeLayout.bind(this)} class="btn bg-info btn-xs" data-filter-type="layout" data-layout="col-xs-6">2 columns</button></li>
              </ul>
            </li>

            <li>
              <strong>Word class:</strong>
              <ul class="list-unstyled">
                <li><button onClick={this.setFilter.bind(this)} data-filter-type="wordClass" data-filter-value="1" class="btn bg-info btn-xs">Substantiva</button></li>
                <li><button onClick={this.setFilter.bind(this)} data-filter-type="wordClass" data-filter-value="2" class="btn bg-info btn-xs">Adjectives</button></li>
                <li><button onClick={this.setFilter.bind(this)} data-filter-type="wordClass" data-filter-value="3" class="btn bg-info btn-xs">Pronomina</button></li>
                <li><button onClick={this.setFilter.bind(this)} data-filter-type="wordClass" data-filter-value="4" class="btn bg-info btn-xs">Numeralia</button></li>
                <li><button onClick={this.setFilter.bind(this)} data-filter-type="wordClass" data-filter-value="5" class="btn bg-info btn-xs">Verba</button></li>
                <li><button onClick={this.setFilter.bind(this)} data-filter-type="wordClass" data-filter-value="6" class="btn bg-info btn-xs">Adverbia</button></li>
                <li><button onClick={this.setFilter.bind(this)} data-filter-type="wordClass" data-filter-value="7" class="btn bg-info btn-xs">Prepozice</button></li>
                <li><button onClick={this.setFilter.bind(this)} data-filter-type="wordClass" data-filter-value="8" class="btn bg-info btn-xs">Konjunkce</button></li>
                <li><button onClick={this.setFilter.bind(this)} data-filter-type="wordClass" data-filter-value="9" class="btn bg-info btn-xs">Partikule</button></li>
                <li><button onClick={this.setFilter.bind(this)} data-filter-type="wordClass" data-filter-value="10" class="btn bg-info btn-xs">Interjekce</button></li>
              </ul>
            </li>

            <li>
              <strong>Others:</strong>
              <ul class="list-unstyled">
                <li><button onClick={this.setFilter.bind(this)} data-filter-type="other" data-filter-value="idiom" class="btn bg-info btn-xs">Idioms</button></li>
                <li><button onClick={this.setFilter.bind(this)} data-filter-type="other" data-filter-value="learned" class="btn bg-info btn-xs">Learned</button></li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="row">
          {block}
        </div>
      </div>
    )
  }
}

export default WordList
