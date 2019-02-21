import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import Select from 'Components/Form/Select'
import Input from 'Components/Form/Input'
import { compose } from 'redux'

import style from './style.scss'

import {
  selectOptionsBrand,
  selectOptionsSocial,
  selectOptionsEngagement,
  selectOptionsDateRange,
} from './options'
import ReportsModal from 'Components/Modal/reports'

class Reports extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      title: '',
    }

    this.openModal = this.openModal.bind(this)
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  openModal() {
    this.setState({ modalIsOpen: !this.state.modalIsOpen })
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  onChange(e) {
    const value = e.target.value
    const name = e.target.key
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { title } = this.state
    return (
      <div>
        <h3>Reports Page</h3>
        <button onClick={() => this.openModal()}>open</button>
        <ReportsModal
          width={440}
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          isClosable={true}
          shouldCloseOnEsc={false}
          shouldCloseOnOverlayClick={false}
          title="Brand Insights"
        >
          <div>
            <form onSubmit={() => console.log('object')}>
              <div className={style.formArea}>
                <div className={style.selectionArea}>
                  <p className={style.label}>Choose a Brand</p>
                  <Field
                    component={Select}
                    options={selectOptionsBrand}
                    id="brand"
                    name="brand"
                    placeholder="Select One"
                    label="Choose a Brand"
                  />
                </div>
                <div className={style.selectionArea}>
                  <p className={style.label}>Social Platform</p>
                  <Field
                    component={Select}
                    options={selectOptionsSocial}
                    id="social"
                    name="social"
                    placeholder="Select One"
                    label="Social Platform"
                  />
                </div>
                <div className={style.selectionArea}>
                  <p className={style.label}>Engagement</p>
                  <Field
                    component={Select}
                    options={selectOptionsEngagement}
                    id="engagement"
                    name="engagement"
                    placeholder="Select One"
                    label="Engagement"
                  />
                </div>
                <div className={style.selectionArea}>
                  <p className={style.label}>Date Range</p>
                  <Field
                    component={Select}
                    options={selectOptionsDateRange}
                    id="date"
                    name="date"
                    placeholder="Select Date"
                    label="Date Range"
                  />
                </div>
                <div className={style.selectionArea}>
                  <p className={style.label}>Title</p>
                  <Input
                    placeholder="Enter title name"
                    onChange={(e) => this.onChange(e)}
                    value={title}
                    customClass={style.titleInput}
                  />
                </div>
                <div className={style.selectionLink}>
                  Generate Report
                  <div className={style.icon}>
                    <span className="icon-Right-Arrow-Circle">
                      <span className="path1" />
                      <span className="path2" />
                      <span className="path3" />
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </ReportsModal>
      </div>
    )
  }
}

export default compose(
  reduxForm({
    form: 'Reports',
  })
)(Reports)
