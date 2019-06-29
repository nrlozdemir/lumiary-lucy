import React from 'react'
import BarAndDoughnutChartModule from 'Components/Modules/BarAndDoughnutChartModule'

class PerformanceComparison extends React.Component {
  callBack = (data, moduleKey) => {
    const { action, report } = this.props
    action({ ...data, report })
  }

  render() {
    const {
      report,
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
          height: 340,
          cutoutPercentage: 58,
          fillText: 'Total Percentage',
          dataLabelFunction: 'insertAfter',
          dataLabelInsert: '%',
        }}
        doughnutCustoms={{
          width: 280,
          height: 280,
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
