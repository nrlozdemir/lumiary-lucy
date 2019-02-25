import React, { Component } from 'react'

import style from './style.scss'
import { selectOptions } from './options'

import Select from 'Components/Form/Select'

import ReportsModal from 'Components/Modal/reports'
import ReportsForm from 'Components/PagesForm/Reports'

import ReactTable from 'react-table'

class Reports extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      data: [
        {
          title: 'Show this report to Steve on Monday',
          category: 'Brands Insights',
          platform: 'Facebook',
          date: '2/11/19',
        },
        {
          title: 'Bleacher Report VS ESPN comparison',
          category: 'Compare Brands',
          platform: 'Instagram',
          date: '2/10/19',
        },
        {
          title: 'Fansided vs Scoutmedia on Facebook',
          category: 'Compare Brands',
          platform: 'Twitter',
          date: '2/8/19',
        },
        {
          title: 'Videos with baseball pitchers losing control',
          category: 'Predefined Reports',
          platform: 'Facebook',
          date: '2/4/19',
        },
        {
          title: 'Bleacher Report performance on Instagram',
          category: 'Brands Insights',
          platform: 'Facebook',
          date: '2/1/19',
        },
      ],
    }
  }

  openModal() {
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  editRow(value) {
    console.log(value.viewIndex)
  }

  render() {
    const { modalIsOpen, data } = this.state
    console.log('modalIsOpen', modalIsOpen)

    return (
      <div className="grid-container col-12 mr-40 ml-40 mt-72 mb-72">
        <div className={style.reportsContainer}>
          {/* <button onClick={() => this.openModal()}>Open modal</button> */}
          <ReportsModal
            width={440}
            isOpen={modalIsOpen}
            closeTimeoutMS={300}
            onAfterOpen={() => this.afterOpenModal()}
            onRequestClose={() => this.closeModal()}
            isClosable={true}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={false}
            title="Brand Insights"
          >
            <ReportsForm />
          </ReportsModal>

          <div className={style.reportsCardContainer}>
            <div className={style.reportsCard}>
              <p className={style.cardTitle}>Brand Insights</p>
              <div className={style.cardIcons}>
                <img
                  src="https://s3.amazonaws.com/quickframe-static-dev/lucy-assets/brand-insights-icon.svg"
                  alt="brand-insights"
                />
              </div>
              <p className={style.cardDescription}>
                Get helpful, detailed engagement metrics about competitor brands
              </p>
            </div>
            <div className={style.reportsCard}>
              <p className={style.cardTitle}>Compare Brands</p>
              <div className={style.cardIcons}>
                <img
                  src="https://s3.amazonaws.com/quickframe-static-dev/lucy-assets/compare-brands-icon.svg"
                  alt="compare-brands"
                />
              </div>
              <p className={style.cardDescription}>
                Compare two brands to learn what’s driving their performance
              </p>
            </div>
            <div className={style.reportsCard}>
              <p className={style.cardTitle}>Properties</p>
              <div className={style.cardIcons}>
                <img
                  src="https://s3.amazonaws.com/quickframe-static-dev/lucy-assets/properties-icon.svg"
                  alt="properties"
                />
              </div>
              <p className={style.cardDescription}>
                View detailed, comparative data of video attributes across
                brands
              </p>
            </div>
            <div className={style.reportsCard}>
              <p className={style.cardTitle}>Predefined Reports</p>
              <div className={style.cardIcons}>
                <img
                  src="https://s3.amazonaws.com/quickframe-static-dev/lucy-assets/predefined-reports-icon.svg"
                  alt="predefined-reports"
                />
              </div>
              <p className={style.cardDescription}>
                Access unique, relevant and invaluable customized data
              </p>
            </div>
          </div>

          <div className={style.reportsTableContainer}>
            <div className={style.reportsTableHeader}>
              <p>Saved Reports</p>
              <div className={style.inputWrapper}>
                <Select
                  options={selectOptions}
                  id="SelectReports"
                  name="SelectReports"
                  placeholder="Select One"
                  label="Select a report"
                />
              </div>
            </div>
            <div className={style.reportsTableBody}>
              <ReactTable
                data={data}
                showPagination={false}
                defaultPageSize={4}
                multiSort={true}
                sortable={true}
                columns={[
                  {
                    Header: 'Title',
                    accessor: 'title',
                  },
                  {
                    Header: 'Category',
                    accessor: 'category',
                  },
                  {
                    Header: 'Platform',
                    accessor: 'platform',
                  },
                  {
                    Header: 'Date',
                    accessor: 'date',
                  },
                  {
                    Header: null,
                    width: 65,
                    Cell: ({ viewIndex }) => (
                      <span
                        className={style.deleteIcon}
                        onClick={() => this.editRow({ viewIndex })}
                      />
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Reports
