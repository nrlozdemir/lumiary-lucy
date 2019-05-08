import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose, bindActionCreators } from 'redux'
import { actions, makeSelectAudienceDominantColor } from 'Reducers/audience'
import RadarChartModule from 'Components/Modules/RadarChartModule'

const addComma = (number) => {
	number = parseInt(number)
  if (number >= 1e3) {
    const unit = Math.floor((number.toFixed(0).length - 1) / 3) * 3
    const unitname = ["k", "m", "B", "T"][Math.floor(unit / 3) - 1]
    return ((number / ('1e' + unit)).toFixed(0) + unitname)
  }

  return number
}

const strToColor = (str) => {
	str = str.toLowerCase().replace(/\s/g, "")

	const color = {
		"red": "#cc2226",
		"red-orange": "#dd501d",
		"orange": "#dd501d", //#eb7919
		"yellow-orange": "#f8b90b",
		"yellow": "#fff20d",
		"yellow-green": "#aac923",
		"green": "#13862b",
		"blue-green": "#229a78",
		"blue": "#3178b0",
		"blue-purple": "#79609b",
		"purple": "#923683",
		"red-purple": "#b83057"
	}

	return color[str]
}

class DominantColor extends React.Component {
  callBack = (data, moduleKey) => {
    this.props.getAudienceDominantColorData(data)
  }

  render() {
    const {
      audienceDominantColorData: { data, loading, error },
		} = this.props

		let radarData = []

		if(data && radarData) {
			radarData = data
			Object.values(data).map((dataRow, d) => {
				//labels
				dataRow.datas.labels.map((datalabelRow, l) => {
					radarData[d].datas.labels[l].color = strToColor(datalabelRow.name)
				})
				//datasets
				dataRow.datas.datasets.map((datasetRow, r) => {
					radarData[d].datas.datasets[r].backgroundColor = "rgba(255, 255, 255, 0.3)"
					radarData[d].datas.datasets[r].borderColor = "transparent"
					radarData[d].datas.datasets[r].pointBackgroundColor = "#ffffff"
					radarData[d].datas.datasets[r].pointBorderColor = "#ffffff"
				})
				//progress
				dataRow.progress.map((progressRow, p) => {
					radarData[d].progress[p].color = strToColor(progressRow.leftTitle)
					radarData[d].progress[p].rightTitle = addComma(progressRow.rightTitle) + " Shares"
				})
			})
		}

    return (
      <RadarChartModule
        data={radarData}
        leftTitle="Male"
        rightTitle="Female"
        moduleKey={'Audience/DominantColor'}
        title="Dominant Color Performance By Gender"
        action={this.callBack}
        filters={[
          {
            type: 'engagement',
            selectKey: 'ADC-was',
            placeHolder: 'Engagement',
          },
          {
            type: 'platform',
            selectKey: 'ADC-wsd',
            placeHolder: 'Platforms',
          },
          {
            type: 'timeRange',
            selectKey: 'ADC-wds',
            placeHolder: 'Date',
          },
        ]}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  audienceDominantColorData: makeSelectAudienceDominantColor(),
})

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default compose(withConnect)(DominantColor)
