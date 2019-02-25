import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import { actions, makeSelectReports } from 'Reducers/reports'

import style from './style.scss'
import { selectOptions } from './options'
import Select from 'Components/Form/Select'
import Button from 'Components/Form/Button'

import ReportsModal from 'Components/Modal/reports'
import ReportsForm from 'Components/PagesForm/Reports'
import RouterLoading from 'Components/RouterLoading'

import ReactTable from 'react-table'

class Reports extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
    }
  }

  componentWillMount() {
    this.props.getReports()
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

  deleteReport(value) {
    console.log('delete a report, index:', value.viewIndex)
  }

  loadMore(value) {
    console.log('load more', value)
    this.props.getMoreReports()
  }

  render() {
    const { modalIsOpen } = this.state
    const {
      reports: { reports, loading, error },
    } = this.props

    console.log('reports', reports)

    return (
      <div className="grid-container col-12 mr-40 ml-40 mt-72 mb-72">
        <div className={style.reportsContainer}>
          <button onClick={() => this.openModal()}>Open modal</button>
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
            {loading ? (
              <RouterLoading />
            ) : (
              <div className={style.reportsTableBody}>
                <ReactTable
                  data={reports}
                  showPagination={false}
                  defaultPageSize={reports.length > 5 ? reports.length : 5}
                  multiSort={true}
                  resizable={false}
                  sortable={true}
                  columns={[
                    {
                      Header: 'Title',
                      accessor: 'title',
                      width: 420,
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
                          onClick={() => this.deleteReport({ viewIndex })}
                        />
                      ),
                    },
                  ]}
                />

                <div className={style.reportsTableFooter}>
                  <Button
                    onClick={() => this.loadMore(true)}
                    customClass="font-secondary-first text-bold"
                    buttonText="Load More"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

Reports.propTypes = {
  reports: PropTypes.object,
  getReports: PropTypes.func,
  dispatch: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  reports: makeSelectReports(),
})

function mapDispatchToProps(dispatch) {
  return {
    getReports: () => dispatch(actions.loadReports()),
    getMoreReports: () => dispatch(actions.loadMoreReports()),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Reports)
