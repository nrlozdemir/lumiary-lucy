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

import ReportCards from './section/reportCards'

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

  deleteReportAction(id) {
    this.props.deleteReport(id)
  }

  loadMore() {
    this.props.getMoreReports()
  }

  render() {
    const { modalIsOpen } = this.state
    const {
      reports: { reports, loading, error },
    } = this.props

    return (
      <div className="grid-container col-12 mr-40 ml-40 mt-72 mb-72">
        <div className={style.reportsContainer}>
          <div className="mb-16">
            <Button buttonText="Open modal" onClick={() => this.openModal()} />
          </div>
          <ReportsModal
            width={440}
            isOpen={modalIsOpen}
            closeTimeoutMS={300}
            onAfterOpen={() => this.afterOpenModal()}
            onRequestClose={() => this.closeModal()}
            isClosable={true}
            shouldCloseOnEsc={true}
            shouldCloseOnOverlayClick={true}
            title="Brand Insights"
          >
            <ReportsForm />
          </ReportsModal>

          <ReportCards />

          <div className={style.reportsTableContainer}>
            <div className={style.reportsTableHeader}>
              <p>Saved Reports</p>
              <div className={style.inputWrapper}>
                <Select
                  options={selectOptions}
                  id="SelectReports"
                  name="SelectReports"
                  placeholder="All Reports"
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
                      Cell: ({ original: { id } }) => (
                        <div className={style.deleteWrapper} tabIndex="1">
                          <div className={style.deleteIcon}>
                            <span
                              className={style.deleteText}
                              onClick={(e) => {
                                this.deleteReportAction(id)
                              }}
                            >
                              Delete Report
                            </span>
                            <a tabIndex="2">cancel</a>
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />

                {/* onClick={() => this.deleteReportAction(id)} */}

                <div className={style.reportsTableFooter}>
                  <Button
                    onClick={() => this.loadMore()}
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
    deleteReport: (id) => dispatch(actions.loadDeleteReport(id)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Reports)
