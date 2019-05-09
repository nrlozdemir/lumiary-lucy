import qs from 'qs'
import { call, put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
import { actions, types } from 'Reducers/panoptic'
import panopticMockData from 'Api/mocks/panopticMock.json'
import audienceMockData from 'Api/mocks/audienceMock.json'
import updateAudiencePer from 'Api/updateAudiencePerformance'

import { ajax } from 'Utils/api'

import _ from 'lodash'

const RESOURCE = '/report'

function getPanopticDataApi() {
	//this will use ajax function in utils/api when real data is provided
	return axios.get('/').then((res) => panopticMockData)
}

function getAudienceDataApi() {
	//this will use ajax function in utils/api when real data is provided
	return axios.get('/').then((res) => audienceMockData)
}

function updateAudiencePerformanceApi({ min, max }) {
	//this will use ajax function in utils/api when real data is provided
	return axios.get('/').then((res) => updateAudiencePer(min, max))
}

function* getVideoReleasesData() {
	try {
		const payload = yield call(getPanopticDataApi)

		const shuffleData = payload.videoReleasesData
		shuffleData.datasets[0].data = _.shuffle(shuffleData.datasets[0].data)
		shuffleData.datasets[1].data = _.shuffle(shuffleData.datasets[1].data)
		yield put(actions.getVideoReleasesDataSuccess(shuffleData))
	} catch (err) {
		yield put(actions.getVideoReleasesDataError(err))
	}
}

function* getColorTemperatureData() {
	try {
		const payload = yield call(getPanopticDataApi)

		const shuffleData = _.shuffle(payload.colorTempData)
		yield put(actions.getColorTemperatureDataSuccess(shuffleData))
	} catch (err) {
		yield put(actions.getColorTemperatureDataError(err))
	}
}

function* getFilteringSectionData() {
	try {
		const payload = yield call(getPanopticDataApi)
		const shuffleData = {
			doughnutData: {
				labels: payload.verticalStackedChartData.doughnutData.labels,
				datasets: [
					{
						backgroundColor:
							payload.verticalStackedChartData.doughnutData.datasets[0]
								.backgroundColor,
						data: _.shuffle(
							payload.verticalStackedChartData.doughnutData.datasets[0].data
						),
						hoverBackgroundColor:
							payload.verticalStackedChartData.doughnutData.datasets[0]
								.hoverBackgroundColor,
					},
				],
			},
			stackedChartData: {
				...payload.verticalStackedChartData.stackedChartData,
				datasets: _.shuffle(
					payload.verticalStackedChartData.stackedChartData.datasets
				),
			},
		}
		yield put(actions.getFilteringSectionDataSuccess(shuffleData))
	} catch (err) {
		yield put(actions.getFilteringSectionDataError(err))
	}
}

function getPacingCardDataApi(vals) {
	return ajax({
		url: RESOURCE,
		method: 'POST',
		params: qs.stringify(vals),
	}).then((response) => {
		if (response.error) {
			throw response.error
		}
		return response.data
	})
}

function* getPacingCardData({ data }) {
	try {
		const { 'PCT-asd': metricOption = {}, 'PCT-wds': dateOption = {} } = data
		const { value: dateOptionValue } = dateOption

		const dateRange =
			(!!dateOptionValue &&
				dateOptionValue.value &&
				(!!dateOptionValue.value.startDate
					? [dateOptionValue.value.startDate, dateOptionValue.value.endDate]
					: dateOptionValue.value)) ||
			'24hours'
			
		console.log(dateRange)

		const metric =
			(!!metricOption && !!metricOption.value && metricOption.value.value) ||
			'views'

		const options = {
			metric,
			dateRange,
			platform: 'all',
			property: ['pacing'],
			dateBucket: 'none',
			display: 'percentage',
		}

		const stadiumData = yield call(getPacingCardDataApi, options)

		const horizontalStackedBarData = yield call(getPacingCardDataApi, {
			...options,
			proportionOf: 'format',
		})

		if (
			!!stadiumData.data &&
			!!stadiumData.data.pacing &&
			!!horizontalStackedBarData.data &&
			!!horizontalStackedBarData.data.pacing
		) {
			const {
				data: { pacing: stadiumPacing },
			} = stadiumData

			const {
				data: { pacing: barChartPacing },
			} = horizontalStackedBarData

			yield put(
				actions.getPacingCardDataSuccess({
					stadiumData: stadiumPacing,
					horizontalStackedBarData: barChartPacing,
				})
			)
		} else {
			yield put(
				actions.getPacingCardDataError('Error fetching pacing card data')
			)
		}
	} catch (err) {
		console.log(err)
		yield put(actions.getPacingCardDataError(err))
	}
}

function* getCompareSharesData() {
	try {
		const payload = yield call(getPanopticDataApi)
		const shuffleData = payload.compareSharesData
		shuffleData[0].datas.datasets[0].data = _.shuffle(
			shuffleData[0].datas.datasets[0].data
		)
		shuffleData[1].datas.datasets[0].data = _.shuffle(
			shuffleData[1].datas.datasets[0].data
		)

		yield put(actions.getCompareSharesDataSuccess(shuffleData))
	} catch (err) {
		yield put(actions.getCompareSharesDataError(err))
	}
}

function* getAudiencePerformanceData() {
	try {
		const payload = yield call(getAudienceDataApi)
		const shuffleData = payload.performance
		shuffleData.bubblesBoth = _.shuffle(shuffleData.bubblesBoth)
		shuffleData.bubblesFemales = _.shuffle(shuffleData.bubblesFemales)
		shuffleData.bubblesMales = _.shuffle(shuffleData.bubblesMales)
		yield put(actions.getAudiencePerformanceDataSuccess(shuffleData))
	} catch (err) {
		yield put(actions.getAudiencePerformanceDataError(err))
	}
}

function* getAudienceAgeSliderData() {
	try {
		const payload = yield call(getAudienceDataApi)
		const randomImage = (image) => {
			return image.replace(
				/image=(\d+)/g,
				'image=' + Math.floor(Math.random(1) * Math.floor(30))
			)
		}
		const data = payload.ageSlider
		data.map((element) => (element.image = randomImage(element.image)))
		yield put(actions.getAudienceAgeSliderDataSuccess(data))
	} catch (err) {
		yield put(actions.getAudienceAgeSliderDataError(err))
	}
}

function* getAudienceGenderData() {
	try {
		const payload = yield call(getAudienceDataApi)
		const shuffleData = payload.genderData
		shuffleData.datasets[0].data = _.shuffle(shuffleData.datasets[0].data)
		shuffleData.datasets[1].data = _.shuffle(shuffleData.datasets[1].data)
		yield put(actions.getAudienceGenderDataSuccess(shuffleData))
	} catch (err) {
		yield put(actions.getAudienceGenderDataError(err))
	}
}

function* getAudienceColorTemperatureData() {
	try {
		const payload = yield call(getAudienceDataApi)
		let shuffleData = payload.colorTempData
		shuffleData = shuffleData.map((data) => {
			data.data.map((item) => {
				item.x = _.random(-50, 50)
				item.y = _.random(-50, 50)
			})
			return data
		})
		yield put(actions.getAudienceColorTemperatureDataSuccess(shuffleData))
	} catch (err) {
		yield put(actions.getAudienceColorTemperatureDataError(err))
	}
}

function* getAudienceChangeOverTimeData() {
	try {
		const payload = yield call(getAudienceDataApi)
		let shuffleData = payload.lineChartData
		shuffleData.datasets[0].data = _.shuffle(shuffleData.datasets[0].data)
		shuffleData.datasets[1].data = _.shuffle(shuffleData.datasets[1].data)
		yield put(actions.getAudienceChangeOverTimeDataSuccess(shuffleData))
	} catch (err) {
		yield put(actions.getAudienceChangeOverTimeDataError(err))
	}
}

function* getAudienceContentVitalityScoreData() {
	try {
		const payload = yield call(getAudienceDataApi)
		let shuffleData = payload.lineStackedChartData
		shuffleData.datasets[0].data = _.shuffle(shuffleData.datasets[0].data)
		shuffleData.datasets[1].data = _.shuffle(shuffleData.datasets[1].data)
		yield put(actions.getAudienceContentVitalityScoreDataSuccess(shuffleData))
	} catch (err) {
		yield put(actions.getAudienceContentVitalityScoreDataError(err))
	}
}

function* getAudienceDominantColorData() {
	try {
		const payload = yield call(getAudienceDataApi)
		let shuffleData = payload.chartData
		shuffleData[0].datas.datasets[0].data = _.shuffle(
			shuffleData[0].datas.datasets[0].data
		)
		shuffleData[1].datas.datasets[0].data = _.shuffle(
			shuffleData[1].datas.datasets[0].data
		)
		yield put(actions.getAudienceDominantColorDataSuccess(shuffleData))
	} catch (err) {
		yield put(actions.getAudienceDominantColorDataError(err))
	}
}

function* getData() {
	try {
		const payload = yield call(getPanopticDataApi)
		yield put(actions.getDataSuccess(payload))
	} catch (err) {
		yield put(actions.getDataError(err))
	}
}

function* getAudienceData() {
	try {
		const payload = yield call(getAudienceDataApi)
		yield put(actions.getAudienceDataSuccess(payload))
	} catch (err) {
		yield put(actions.getAudienceDataError(err))
	}
}

function* updateAudiencePerformance({ payload: { min, max } }) {
	try {
		const payload = yield call(updateAudiencePerformanceApi, { min, max })
		yield put(actions.updateAudiencePerformanceSuccess(payload))
	} catch (err) {
		yield put(actions.updateAudiencePerformanceError(err))
	}
}

function* getFlipCardsData() {
	try {
		const payload = yield call(getPanopticDataApi)
		yield put(actions.getFlipCardsDataSuccess(payload.flipCardsData))
	} catch (err) {
		yield put(actions.getFlipCardsDataError(err))
	}
}

export default [
	takeLatest(types.GET_DATA, getData),
	takeLatest(types.GET_VIDEO_RELEASES_DATA, getVideoReleasesData),
	takeLatest(types.GET_COLOR_TEMPERATURE_DATA, getColorTemperatureData),
	takeLatest(types.GET_FILTERING_SECTION_DATA, getFilteringSectionData),
	takeLatest(types.GET_PACING_CARD_DATA, getPacingCardData),
	takeLatest(types.GET_COMPARE_SHARES_DATA, getCompareSharesData),

	takeLatest(types.GET_AUDIENCE_PERFORMANCE_DATA, getAudiencePerformanceData),
	takeLatest(types.GET_AUDIENCE_AGE_SLIDER_DATA, getAudienceAgeSliderData),
	takeLatest(types.GET_AUDIENCE_GENDER_DATA, getAudienceGenderData),
	takeLatest(
		types.GET_AUDIENCE_COLOR_TEMPERATURE_DATA,
		getAudienceColorTemperatureData
	),
	takeLatest(
		types.GET_AUDIENCE_CHANGE_OVER_TIME_DATA,
		getAudienceChangeOverTimeData
	),
	takeLatest(
		types.GET_AUDIENCE_CONTENT_VITALITY_SCORE_DATA,
		getAudienceContentVitalityScoreData
	),
	takeLatest(
		types.GET_AUDIENCE_DOMINANT_COLOR_DATA,
		getAudienceDominantColorData
	),

	takeLatest(types.GET_AUDIENCE_DATA, getAudienceData),
	takeLatest(types.UPDATE_AUDIENCE_PERFORMANCE, updateAudiencePerformance),
	takeLatest(types.GET_FLIPCARDS_DATA, getFlipCardsData),
]
