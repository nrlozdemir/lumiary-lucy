import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux'

import style from './style.scss'
import { selectOptions, lineChartOptions } from './options'

import Select from 'Components/Form/Select'
import LineChart from 'Components/LineChart/Chart'
import PointerCard from 'Components/PointerCard'
import DoughnutChart from 'Components/Charts/LibraryDetail/Doughnut'

class LibraryDetailDoughnutChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDoughnutVisible: true,
    }
  }

  changeVisibilityDoughnut() {
    this.setState((prevState) => ({
      isDoughnutVisible: !prevState.isDoughnutVisible,
    }))
  }

  render() {
    const { isDoughnutVisible } = this.state
    const { doughnutData, lineChartData } = this.props
    return (
      <div className="col-12 shadow-1 mt-48 bg-dark-grey-blue">
        <div className={style.radialChartsContainer}>
          {isDoughnutVisible &&
            doughnutData &&
            doughnutData.map((chart, i) => (
              <div
                key={i}
                className={style.radialChart}
                onClick={this.changeVisibilityDoughnut.bind(this)}
              >
                <h1 className="font-primary text-bold text-center">
                  {chart.title}
                </h1>
                <div className={style.subtitle}>
                  <p className="font-secondary-second font-size-12 text-center">
                    {chart.secondTitle}
                  </p>
                </div>
                <div className={style.doughnutChartContainer}>
                  <DoughnutChart doughnutData={chart.average} />
                  <p className="pt-32">
                    <span className={style.textBold}>
                      {chart.average[chart.average.length - 1]}%
                    </span>
                    of your library is shot in
                    <span className={style.textBold}>{chart.secondTitle}</span>
                  </p>
                </div>
              </div>
            ))}
          {!isDoughnutVisible && (
            <div className={style.radialChartsContainer}>
              <div className={style.doughnutPanelTab}>
                <div className={style.doughnutPanelHeader}>
                  <div onClick={this.changeVisibilityDoughnut.bind(this)}>
                    <div className={style.iconWrapper}>
                      <span className="icon-X-Circle">
                        <span className="path1" />
                        <span className="path2" />
                        <span className="path3" />
                      </span>
                      <p className={style.iconTitle}>Frame Rate</p>
                    </div>
                  </div>
                  <div className={style.headerInfo}>
                    <div>
                      <p className={style.panelTitle}>24 Fps</p>
                    </div>
                    <div className={style.formWrapper}>
                      <form onSubmit={() => console.log('object')}>
                        <Field
                          component={Select}
                          options={selectOptions}
                          id="NumberOfScenes"
                          name="NumberOfScenes"
                          placeholder="Select One"
                          label="Number of Scenes"
                          className={style.formWrapper}
                        />
                        <Field
                          component={Select}
                          options={selectOptions}
                          id="NumberOfScenes"
                          name="NumberOfScenes"
                          placeholder="Select One"
                          label="Number of Scenes"
                          className={style.formWrapper}
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <div className={style.dataWrapper}>
                  <div className={style.panelChart}>
                    <h1 className="font-primary text-bold text-center">
                      Library Data
                    </h1>
                    <div className={style.doughnutChartContainer}>
                      <DoughnutChart doughnutData={[30, 12, 6, 52]} />
                      <p className="pt-32">
                        <span className={style.duskRound} />
                        <span className={style.textBold}>{52}%</span> of your
                        library is shot in
                        <span className={style.textBold}>24fps</span>
                      </p>
                    </div>
                  </div>
                  <div className={style.panelChart}>
                    <PointerCard
                      data={{
                        topTitle: 'Based on Likes',
                        pointerData: 140,
                        bottomText: 'of your library is shot in',
                        likes: 50,
                      }}
                    />
                  </div>
                  <div className={style.panelChart}>
                    <h1 className="font-primary text-bold text-center">
                      Industry Data
                    </h1>
                    <div className={style.doughnutChartContainer}>
                      <DoughnutChart doughnutData={[30, 12, 6, 52]} color="#8567f0" />
                      <p className="w-75 text-center pt-32">
                        <span className={style.purpleRound} />
                        <span className={style.textBold}>{52}%</span> of your
                        library is shot in
                        <span className={style.textBold}>24fps</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-100 mt-48 mb-48">
                  <LineChart
                    backgroundColor="#242b49"
                    dataSet={lineChartData}
                    width={1070}
                    height={291}
                    options={lineChartOptions}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default compose(
  reduxForm({
    form: 'libraryDetailDoughnutChart',
  })
)(LibraryDetailDoughnutChart)
