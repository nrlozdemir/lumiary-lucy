import React from 'react'
import PropTypes from 'prop-types'
import TopSimilarPropertiesItem from 'Components/TopSimilarPropertiesItem'
import Module from 'Components/Module'
import DoughnutCard from 'Components/DoughnutCard'
const mock = [
  {
    title: '#1 Pacing',
    secondTitle: 'Fast',
    description: 'Pacing',
    average: [21.4, 8.73, 26.64, 43.23],
    libraryData: [21.5, 44.5, 25, 9],
    industryData: [6.7, 38.39, 43.75, 11.16],
    libraryFpsData: { percentage: '52', fps: '24' },
    industryFpsData: { percentage: '36', fps: '45' },
    lineChartData: [
      { data: [62, 16, 58, 67, 13, 25, 40] },
      { data: [97, 58, 60, 29, 89, 71, 26] },
    ],
  },
  {
    title: '#2 Duration',
    secondTitle: '0-15s',
    description: 'Duration',
    average: [10, 15, 25, 50],
    libraryData: [53.19, 8.51, 14.36, 23.94],
    industryData: [18.44, 18.85, 34.43, 28.28],
    libraryFpsData: { percentage: '40', fps: '39' },
    industryFpsData: { percentage: '60', fps: '47' },
    lineChartData: [
      { data: [60, 25, 42, 51, 58, 70, 64] },
      { data: [97, 87, 19, 97, 78, 86, 66] },
    ],
  },
  {
    title: '#3 Dominant Color',
    secondTitle: 'Blue',
    description: '',
    average: [24, 17.71, 9.14, 49.14],
    libraryData: [1.84, 33.09, 28.31, 36.76],
    industryData: [8.74, 7.28, 43.69, 40.29],
    libraryFpsData: { percentage: '44', fps: '55' },
    industryFpsData: { percentage: '72', fps: '29' },
    lineChartData: [
      { data: [70, 72, 36, 52, 84, 92, 88] },
      { data: [0, 8, 39, 5, 77, 31, 67] },
    ],
  },
]
const TopSimilarProperties = (props) => {
  let values
  const { data, title, filters, action, moduleKey, presentWithDoughnut } = props
  values = presentWithDoughnut ? mock : data
  return (
    <Module
      title={title}
      filters={filters}
      moduleKey={moduleKey}
      action={action}
    >
      <div className="col-12-no-gutters">
        {values &&
          values.map((sectionItem, i) => {
            if (presentWithDoughnut) {
              return <DoughnutCard data={sectionItem} key={i} />
            }

            return (
              <TopSimilarPropertiesItem
                key={i}
                sectionItem={sectionItem}
                i={i}
              />
            )
          })}
      </div>
    </Module>
  )
}

TopSimilarProperties.propTypes = {
  data: PropTypes.array,
}

export default TopSimilarProperties
