import React from 'react'
import RadarChartModule from 'Components/Modules/RadarChartModule'

const strToColor = (str) => {
  str = str.toLowerCase().replace(/\s/g, '')

  const color = {
    red: '#cc2226',
    'red-orange': '#dd501d',
    orange: '#dd501d', //#eb7919
    'yellow-orange': '#f8b90b',
    yellow: '#fff20d',
    'yellow-green': '#aac923',
    green: '#13862b',
    'blue-green': '#229a78',
    blue: '#3178b0',
    'blue-purple': '#79609b',
    purple: '#923683',
    'red-purple': '#b83057',
  }
  return color[str]
}

class ColorComparison extends React.Component {
  callBack = (data, moduleKey) => {
    const { action, report } = this.props
    action({ ...data, report })
  }

  render() {
    const {
      data: { data, loading, error },
    } = this.props

    let colorsData
    if (data && data.length > 0) {
      colorsData = data
      colorsData.map((el, i) => {
        el.total = el.datas.labels
          .map((a, k) => a)
          .reduce((prev, next) => prev + parseFloat(next.count), 0)
        el.progress = []

        el.datas.datasets[0].backgroundColor = 'rgba(255, 255, 255, 0.3)'
        el.datas.datasets[0].borderColor = 'transparent'
        el.datas.datasets[0].pointBackgroundColor = '#ffffff'
        el.datas.datasets[0].pointBorderColor = '#ffffff'
        el.datas.datasets[0].data = []

        el.datas.labels
          .map((sub, k) => sub)
          .sort((a, b) =>
            parseFloat(a.count) < parseFloat(b.count)
              ? 1
              : parseFloat(b.count) < parseFloat(a.count)
              ? -1
              : 0
          )
          .filter((m, j) => j < 3)
          .map((f, k) => {
            el.progress.push({
              leftTitle: f.name,
              color: strToColor(f.name),
              rightTitle: `${f.count}k Shares`,
              value: ((f.count / el.total) * 100).toFixed(0),
            })
          })

        el.datas.labels.map((sub, k) => {
          data[i].datas.labels[k].color = strToColor(sub.name)
          data[i].datas.labels[k].selected = !!el.progress.find(
            (selected, i) => selected.color === strToColor(sub.name)
          )
          data[i].datas.datasets[0].data.push(sub.count)
        })
      })
    }

    return (
      <RadarChartModule
        leftTitle={colorsData && colorsData.length > 0 && colorsData[0].type}
        rightTitle={colorsData && colorsData.length > 0 && colorsData[1].type}
        data={colorsData}
        moduleKey={'Reports/ColorComparison'}
        title="Video Library Color Comparison"
        action={this.callBack}
        loading={loading}
        filters={[
          {
            type: 'metric',
            selectKey: 'RVC-was',
            placeHolder: 'Engagement',
          },
          {
            type: 'dateRange',
            selectKey: 'RVC-swda',
            placeHolder: 'Date',
          },
        ]}
      />
    )
  }
}

export default ColorComparison
