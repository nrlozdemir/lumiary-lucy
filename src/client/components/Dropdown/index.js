import React, { Component } from 'react'
import classnames from 'classnames'
import style from './style.scss'

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDropDownVisible: false,
      listItems: props.listItems,
      selectedItem: null,
      dateRange: {
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
      },
    }
  }

  handleHoverDropdown() {
    this.setState((prevState) => {
      return {
        isDropDownVisible: !prevState.isDropDownVisible,
      }
    })
  }

  handleSelectItem(index) {
    this.setState({
      selectedItem: index,
    })
  }

  handleChange = (selectedOption, name) => {
    this.setState({ [name]: selectedOption })
  }

  render() {
    const { title, dateElementIndex } = this.props
    const {
      isDropDownVisible,
      selectedItem,
      listItems,
      dateRange,
      selectDate,
    } = this.state

    const selectedTitle =
      (selectedItem && listItems[selectedItem].name) || title
    return (
      <div
        onMouseEnter={() => this.handleHoverDropdown()}
        onMouseLeave={() => this.handleHoverDropdown()}
      >
        <div className={style.ddWrapper}>
          <div className={style.ddHeader}>
            <p className={style.ddHeaderTitle}>{selectedTitle}</p>
          </div>
          <ul className={style.ddList}>
            {listItems &&
              isDropDownVisible &&
              listItems.map((item, index) => (
                <li
                  onClick={() => this.handleSelectItem(index)}
                  key={`ddwn-${index}`}
                  className={classnames(style.ddListItem, {
                    [style.active]: selectedItem === index,
                  })}
                >
                  {item.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Dropdown
