import React from 'react'
import BarAndDoughnutChartModule from 'Components/Modules/BarAndDoughnutChartModule'
import { isEqual } from 'lodash'

class PerformanceComparison extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {
      data: { data: nextData, loading: nextLoading },
    } = nextProps

    const {
      data: { data, loading },
    } = this.props

    return !isEqual(nextData, data) || loading !== nextLoading
  }

  callBack = (data, moduleKey) => {
    const { action, report } = this.props
    action({ ...data, report })
  }

  render() {
    const {
      data: { data, loading, error },
    } = this.props

    let doughnutData = {}

    if (data) {
      const totalData = data.datasets.reduce((acc, dataset) => {
        return acc + dataset.data.reduce((acc, val) => acc + val, 0)
      }, 0)

      const firstDatasetValue = data.datasets[0].data.reduce(
        (acc, val) => acc + val,
        0
      )
      const secondDatasetValue = data.datasets[1].data.reduce(
        (acc, val) => acc + val,
        0
      )

      doughnutData.datasets = [
        {
          data: [
            (firstDatasetValue / (totalData / 100)).toFixed(2),
            (secondDatasetValue / (totalData / 100)).toFixed(2),
          ],
          backgroundColor: [
            data.datasets[0].backgroundColor,
            data.datasets[1].backgroundColor,
          ],
        },
      ]
      doughnutData.labels =
        !!data && !!data.legend && !!data.legend.length
          ? data.legend.map((d) => d.label)
          : []
    }

    return (
      <BarAndDoughnutChartModule
        doughnutData={{ ...doughnutData }}
        stackedChartData={{ ...data }}
        moduleKey={'Reports/PerformanceComparison'}
        title="Property Performance Comparison"
        action={this.callBack}
        filters={[
          {
            type: 'property',
            selectKey: 'RPC-asasdd',
            placeHolder: 'Resolution',
          },
          {
            type: 'metric',
            selectKey: 'RPC-aqax',
            placeHolder: 'Engagement',
          },
        ]}
        legend={
          !!data && !!data.legend && !!data.legend.length ? data.legend : []
        }
        reverse={false}
        barCustoms={{
          width: 720,
          height: 291,
          cutoutPercentage: 58,
          fillText: 'Total Percentage',
          dataLabelFunction: 'insertAfter',
          dataLabelInsert: '%',
          datalabels: true,
          hideLabels: true,
        }}
        doughnutCustoms={{
          width: 288,
          height: 288,
          cutoutPercentage: 58,
          fillText: 'Total Percentage',
          dataLabelFunction: 'insertAfter',
          dataLabelInsert: '%',
        }}
        loading={loading}
      />
    )
  }
}

export default PerformanceComparison
