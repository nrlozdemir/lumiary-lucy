import React, { Component } from "react"
import { DateRange } from "react-date-range"
import classnames from "classnames"
import moment from "moment"
import { Field } from "redux-form"
import "chartjs-plugin-datalabels"

import style from "../../style.scss"
import {
	dateSelectOptions,
	dropdownLists,
	selectOptions,
} from "./options"

import Dropdown from "Components/Dropdown"
import Select from "Components/Form/Select"
import Button from "Components/Form/Button"
import DoughnutChart from "Components/Charts/Panoptic/DoughnutChart";
import VerticalStackedBarChart from "Components/Charts/Panoptic/VerticalStackedBarChart";

class PanopticFilteringSection extends Component{
  constructor(props){
    super(props)
    this.state = {
      isStackedChartSidebarVisible: false,
      dateRange: {
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection"
        }
      },
      startDateRange: {
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection"
        }
      },
      endDateRange: {
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection"
        }
      },
    }
  }

  handleChange = (selectedOption, name) => {
    this.setState({ [name]: selectedOption })
  }

  setSidebarVisible(type){
    this.setState({
      isStackedChartSidebarVisible: type
    })
	}

	datasetKeyProvider() {
		return randomKey(5)
	}

  render(){
    const { data: { doughnutData, stackedChartData, doughnutRoundData } } = this.props;
    const {
      dateRange: { selection: dateRange },
      startDateRange: { selection: startDateRange },
      endDateRange: { selection: endDateRange },
      selectDate,
      endDate,
      startDate,
      isStackedChartSidebarVisible,
    } = this.state
    return (
      <div className="col-12 shadow-1 mt-72 bg-dark-grey-blue">
        <div className={style.radialChartsContainer}>
          <div className={style.temperatureHeader}>
            <div className={style.dropDowns}>
              <Dropdown
                title="Duration"
                listItems={dropdownLists.duration}
              />
              <span>by</span>
              <Dropdown
                title="Views"
                listItems={dropdownLists.views}
              />
              <span>for</span>
              <Dropdown
                title="Facebook"
                listItems={dropdownLists.socialMedia}
              />
              <span>in</span>
              <Dropdown
                title="Today"
                listItems={dropdownLists.dateRange}
              />
            </div>
            <div className={style.inputWrapper}>
              <Button
                onClick={() => this.setSidebarVisible(true)}
                customClass="float-right font-secondary-first text-bold"
                buttonText="Filter Videos"
                iconRight="qf-iconAdd"
              />
            </div>
          </div>
          <div className="d-flex align-items-center justify-space-between ph-48">
            <div className={style.radialAndStackChartWrapper}>
              <div>
                <DoughnutChart data={doughnutData.average}/>
              </div>
              <div>
                {
                  doughnutRoundData && doughnutRoundData.map((roundData, index) => (
                    <div className="d-flex align-items-center pv-8" key={index}>
                      <span className={style.round} style={{backgroundColor: `${roundData.color}`}}></span>
                      <span className={style.secondsText}>{roundData.data}</span>
                    </div>
                  ))
                }
              </div>
            </div>
            <div className={style.stackedChart}>
							<VerticalStackedBarChart data={stackedChartData}/>
            </div>
          </div>
          {
            isStackedChartSidebarVisible &&
            <div className={style.stackedChartSideBar}>
              <div className={style.stackedChartSideBarContent}>
                <div className={style.closeIconWrapper}>
                  <i className="qf-iconX" onClick={() => this.setSidebarVisible(false)}></i>
                </div>
                <div className={style.filterAreaWrapper}>
                  <div className="pb-40">
                    <p className={style.label}>Video Format</p>
                    <Field
                      component={Select}
                      options={selectOptions}
                      id="NumberOfScenes"
                      name="NumberOfScenes"
                      placeholder="Select One"
                      label="Number of Scenes"
                      className={style.formWrapper}
                    />
                  </div>
                  <div className="pb-40">
                    <p className={style.label}>Age Audience</p>
                    <Field
                      component={Select}
                      options={selectOptions}
                      id="NumberOfScenes"
                      name="NumberOfScenes"
                      placeholder="Select One"
                      label="Number of Scenes"
                    />
                  </div>
                  <div className="pb-40">
                    <p className={style.label}>Gender Audience</p>
                    <Field
                      component={Select}
                      options={selectOptions}
                      id="NumberOfScenes"
                      name="NumberOfScenes"
                      placeholder="Select One"
                      label="Number of Scenes"
                    />
                  </div>
                  <div className={style.dividedSelects}>
                    <div>
                      <p className={style.label}>Start Date</p>
                      <Field
                        component={Select}
                        options={dateSelectOptions}
                        name="startDate"
                        placeholder="Select One"
                        label="Number of Scenes"
                        onChange={option => this.handleChange(option, "startDate")}
                        value={startDate || ""}
                      />
                      {
                        startDate && startDate.value === "custom" && (
                          <div className={classnames(style.dateRange, "absoluteInlineDatepicker")}>
                            <DateRange
                              onChange={value => this.handleChange(value, "startDateRange")}
                              moveRangeOnFirstSelection={false}
                              ranges={[startDateRange]}
                              className="dateRangeWrapper"
                            />
                            <div className="inline-buttons">
                              <div
                                onClick={() =>
                                  this.setState({
                                    startDate: null
                                  })
                                }
                              >
                                Back
                              </div>
                              <div
                                onClick={() =>
                                  this.setState({
                                    startDate: {
                                      value:
                                        moment(startDateRange.startDate).format("DD/MM/YYYY"),
                                      label:
                                        moment(startDateRange.startDate).format("DD/MM/YYYY")
                                    }
                                  })
                                }
                              >
                                Apply
                              </div>
                            </div>
                          </div>
                        )
                      }
                    </div>
                    <div>
                      <p className={style.label}>End Date</p>
                      <Field
                        component={Select}
                        options={dateSelectOptions}
                        name="endDate"
                        onChange={option => this.handleChange(option, "endDate")}
                        value={endDate || ""}
                      />
                      {
                        endDate && endDate.value === "custom" && (
                          <div className={classnames(style.dateRange, "absoluteInlineDatepicker")}>
                            <DateRange
                              onChange={value => this.handleChange(value, "endDateRange")}
                              moveRangeOnFirstSelection={false}
                              ranges={[endDateRange]}
                              className="dateRangeWrapper"
                            />
                            <div className="inline-buttons">
                              <div
                                onClick={() =>
                                  this.setState({
                                    endDate: null
                                  })
                                }
                              >
                                Back
                              </div>
                              <div
                                onClick={() =>
                                  this.setState({
                                    endDate: {
                                      value:
                                        moment(endDateRange.endDate).format("DD/MM/YYYY"),
                                      label:
                                        moment(endDateRange.endDate).format("DD/MM/YYYY")
                                    }
                                  })
                                }
                              >
                                Apply
                              </div>
                            </div>
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default PanopticFilteringSection
