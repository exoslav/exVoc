import React from 'react'
import Item from './Item'
import { vocabularyLang, setVocabularyLang } from '../../userState'
// import LS from '../../helpers/localStorage'

class LanguageMenu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      menuItems: this.props.items,
      activeItem: this.props.activeItem
    }
  }

  handleLangChange(e) {
    const val = e.target.getAttribute('data-lang')

    // if clicked on active vocabulary
    if(vocabularyLang === val)
      return

    setVocabularyLang(val)

    this.props.changeLang(val)
  }

  render() {
    const items = this.state.menuItems.map((item, i) => <Item
      handleChange={this.handleLangChange.bind(this)}
      name={item}
      key={i}
    />)

    return(
      <ul class="list-unstyled">
        {items}
      </ul>
    )
  }
}

export default LanguageMenu
