import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudienceGender } from 'Reducers/audience'
import Module from 'Components/Module'
import HorizontalBarChart from 'Components/Charts/HorizontalBarChart'
//import { barChartOptions } from './chartOptions'
import { isDataSetEmpty } from 'Utils/datasets'
import { moduleFilters, moduleLegends } from './options'
import style from '../../style.scss'

const Labels = ({ loading, labels }) => {
  return (
    (!loading && !!labels && (
      <div className={style.legends}>
        {!loading &&
          labels.map((label, idx) => (
            <div key={`label_${label}-${idx}`} className={style.legend}>
              {label}
            </div>
          ))}
      </div>
    )) ||
    null
  )
}

const HorizontalBarCharts = ({ loading, genderData }) => {
  return (
    (!loading && genderData && genderData.datasets && (
      <React.Fragment>
        <HorizontalBarChart
          data={
            !loading && !!genderData.datasets[0] ? genderData.datasets[0] : []
          }
          reverse
          grids={['100%', '50%', '0%']}
          tooltipType="extended"
          gender="Male"
        />
        <HorizontalBarChart
          data={
            !loading && !!genderData.datasets[1] ? genderData.datasets[1] : []
          }
          grids={['0%', '50%', '100%']}
          tooltipType="extended"
          gender="Female"
        />
      </React.Fragment>
    )) ||
    null
  )
}

const ModuleComponent = ({
  type,
  audienceGenderData: {
    data,
    data: { dataset },
    loading,
    error,
  },
  callBack,
}) => {
  const labels = (data.dataset && Object.keys(data.dataset)) || []

  let genderData = []

  const colorSelector = {
    0: '#5292E5',
    1: '#2FD7C4',
  }

  if (!!labels.length) {
    genderData = labels.reduce(
      (datasets, label) => {
        const { male, female } = data.dataset[label]
        datasets[0].data.push(Math.round(male * 100))
        datasets[1].data.push(Math.round(female * 100))
        return datasets
      },
      [
        {
          data: [],
        },
        { data: [] },
      ]
    )

    genderData = {
      datasets: genderData.map((el, i) => {
        return {
          ...el,
          borderWidth: 1,
          label: labels,
          borderColor: colorSelector[i],
          backgroundColor: colorSelector[i],
        }
      }),
    }
  }

  return (
    <Module
      actionOnProp={type}
      loading={loading}
      isEmpty={!loading && isDataSetEmpty(genderData)}
      moduleKey={'Audience/Gender'}
      title="Video Properties Split By Gender"
      action={callBack}
      filters={moduleFilters}
      legend={moduleLegends}
    >
      <div className={style.audienceContainer}>
        <div className={style.container}>
          <Labels loading={loading} labels={labels} />
          <HorizontalBarCharts loading={loading} genderData={genderData} />
        </div>
      </div>
    </Module>
  )
}

class GenderSection extends React.Component {
  callBack = (data, moduleKey) => {
    const { type, getAudienceGenderData } = this.props
    getAudienceGenderData({ ...data, type })
  }

  render() {
    const nestedProps = {
      callBack: this.callBack,
      ...this.props,
    }
    return <ModuleComponent {...nestedProps} />
  }
}

const mapStateToProps = createStructuredSelector({
  audienceGenderData: makeSelectAudienceGender(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(GenderSection)
