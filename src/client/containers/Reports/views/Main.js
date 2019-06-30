import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import moment from 'moment'
import {
  actions,
  makeSelectReports,
  makeSelectPredefinedReports,
} from 'Reducers/reports'
import { makeSelectAuthProfile } from 'Reducers/auth'
import Select from 'Components/Form/Select'
import Button from 'Components/Form/Button'
import ReportsModal from 'Components/Modal/Reports'
import ReportsForm from 'Components/PageForms/Reports/BrandInsight'
import CompareBrand from 'Components/PageForms/Reports/CompareBrand'
import PredefinedReport from 'Components/PageForms/Reports/PredefinedReport'
import RouterLoading from 'Components/RouterLoading'
import ReportCards from '../section/ReportCardsModule'
import ReactTable from 'react-table'
import { selectOptions } from '../options'
import style from '../style.scss'
import { staticUrl } from 'Utils/globals'

import { ThemeContext } from 'ThemeContext/themeContext'

class Reports extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      selectedReportCardKey: null,
      reportCardsData: [
        {
          key: 'brand-insights',
          icon: `${staticUrl}lucy-assets/brand-insights-icon.png`,
          title: 'Brand Insights',
          text:
            'Get helpful, detailed engagement metrics about competitor brands',
        },
        {
          key: 'compare-brands',
          icon: `${staticUrl}lucy-assets/compare-brands-icon.png`,
          title: 'Compare Brands',
          text: 'Compare two brands to learn what’s driving their performance',
        },
        {
          key: 'predefined-reports',
          icon: `${staticUrl}lucy-assets/predefined-reports-icon.png`,
          title: 'Predefined Reports',
          text: 'Access unique, relevant and invaluable customized data',
        },
      ],
    }
  }

  componentDidMount() {
    const { getPredefinedReports } = this.props
    getPredefinedReports()
  }

  componentWillMount() {
    this.props.loadReports()
  }

  openModal = (value) => {
    this.setState({ modalIsOpen: true, selectedReportCardKey: value })
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({ modalIsOpen: false })
  }

  deleteReportAction(id) {
    this.props.loadDeleteReport(id)
  }

  loadMore() {
    this.props.loadMoreReports()
  }

  renderModalInside = () => {
    const { selectedReportCardKey } = this.state
    const {
      predefinedReports,
      brandInsightFormSubmit,
      compareBrandFormSubmit,
      profile: { brand },
    } = this.props

    const brands = [
      {
        name: brand.name,
        uuid: brand.uuid,
      },
      ...brand.competitors,
    ].map((competitor) => ({
      value: competitor.uuid,
      label: competitor.name,
    }))

    switch (selectedReportCardKey && selectedReportCardKey.key) {
      case 'brand-insights':
        return (
          <ReportsForm
            handleSubmitFunc={brandInsightFormSubmit}
            brands={brands}
          />
        )

      case 'compare-brands':
        return (
          <CompareBrand
            handleSubmitFunc={compareBrandFormSubmit}
            brands={brands}
          />
        )

      case 'predefined-reports':
        return <PredefinedReport predefinedReports={predefinedReports} />

      default:
        return null
    }
  }

  render() {
    const { modalIsOpen, reportCardsData, selectedReportCardKey } = this.state

    const {
      reports: { data, loading, error },
    } = this.props

    // tableHeaderBackground
    // tableBodyBackground
    // tableBackground
    // tableBorder
    // tableShadow
    //
    return (
      <ThemeContext.Consumer>
        {({ themeContext: { colors } }) => (
          <div className="grid-container col-12 mr-40 ml-40 mt-72 mb-72">
            <style key={Math.random()}>
              {`
              .ReactTable {
                color: ${colors.textColor};
              }
              .ReactTable .rt-tbody {
                background: ${colors.tableBackground};
                border-color: ${colors.tableBorder};
              }
              .ReactTable .rt-tbody .rt-tr-group {
                border-color: ${colors.tableBorder};
              }

              .ReactTable .rt-tbody .rt-tr-group:hover {
                background-color: ${colors.tableRowHoverBg};
                font-family: 'ClanOT';
                font-weight: bold;
              }
            `}
            </style>
            <div className={style.reportsContainer}>
              <ReportsModal
                width={440}
                isOpen={modalIsOpen}
                closeTimeoutMS={300}
                onAfterOpen={() => this.afterOpenModal()}
                onRequestClose={() => this.closeModal()}
                isClosable={true}
                shouldCloseOnEsc={true}
                shouldCloseOnOverlayClick={true}
                title={selectedReportCardKey && selectedReportCardKey.title}
              >
                {this.renderModalInside()}
              </ReportsModal>
              <ReportCards
                reportCardsData={reportCardsData}
                openModal={this.openModal}
              />

              <div
                className={style.reportsTableContainer}
                style={{
                  background: colors.tableBodyBackground,
                  boxShadow: `0 2px 6px 0 ${colors.tableShadow}`,
                }}
              >
                <div
                  className={style.reportsTableHeader}
                  style={{
                    background: colors.tableHeaderBackground,
                    color: colors.textColor,
                    boxShadow: `0 2px 6px 0 ${colors.tableShadow}`,
                  }}
                >
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
                      data={data}
                      noDataText="No reports data"
                      showPagination={false}
                      multiSort={true}
                      resizable={false}
                      sortable={true}
                      minRows={4}
                      className={style.table}
                      pageSize={data.length}
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
                          accessor: 'social',
                        },
                        {
                          Header: 'Date',
                          accessor: 'date',
                          sortMethod: (a, b) => {
                            const valueOfA = moment(a, 'D/M/YY').valueOf()
                            const valueOfB = moment(b, 'D/M/YY').valueOf()
                            return valueOfA - valueOfB
                          },
                        },
                        {
                          Header: null,
                          width: 65,
                          Cell: ({ original: { id } }) => (
                            <div className={style.deleteWrapper} tabIndex="1">
                              <div
                                className={style.deleteIcon}
                                style={{
                                  color: colors.textColor,
                                  background: colors.tablePopoverBackground,
                                }}
                              >
                                <span
                                  className={style.deleteText}
                                  style={{
                                    color: colors.tablePopoverDeleteColor,
                                  }}
                                  onClick={(e) => {
                                    this.deleteReportAction(id)
                                  }}
                                >
                                  Delete Report
                                </span>
                                <a
                                  tabIndex="2"
                                  style={{
                                    color: colors.tablePopoverColor,
                                  }}
                                >
                                  Cancel
                                </a>
                              </div>
                            </div>
                          ),
                        },
                      ]}
                    />

                    {/* onClick={() => this.deleteReportAction(id)} */}

                    <div className={style.reportsTableFooter}>
                      {/* <Button
                        onClick={() => this.loadMore()}
                        customClass="font-secondary-first text-bold"
                        buttonText="Load More"
                      /> */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  reports: makeSelectReports(),
  profile: makeSelectAuthProfile(),
  predefinedReports: makeSelectPredefinedReports(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(Reports)
