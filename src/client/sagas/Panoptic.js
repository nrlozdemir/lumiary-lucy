import { call, put, takeLatest, all } from "redux-saga/effects";
import { actions, types } from "Reducers/Panoptic";

export function* getData() {
	try{
		const data = {
			colorTempData: [
				{
					data: [
						{x: -50, y:82, color: '#ff556f'},
						{x: 50,y:-25, color: '#51adc0'},
						{x: 75, y: -30, color: '#8567f0'},
						{x: 60, y: 30, color: '#ffffff'},
						{x: -12, y: -30, color: '#242b49'},
					]
				},
				{
					data: [
						{x: -50, y:12, color: '#ff556f'},
						{x: 50,y:25, color: '#51adc0'},
						{x: 75, y: -30, color: '#8567f0'},
					]
				},
				{
					data: [
						{x: -50, y:12, color: '#ff556f'},
						{x: 50,y:-75, color: '#51adc0'},
						{x: 75, y: -30, color: '#8567f0'},
					]
				},
				{
					data: [
						{x: -50, y:12, color: '#ff556f'},
						{x: 50,y:-75, color: '#51adc0'},
						{x: 75, y: -30, color: '#8567f0'},
					]
				}
			],
		};
		yield put(actions.getDataSuccess(data));
	}catch (err){
		yield put(actions.getDataError(err))
	}
}

export default function* panopticSaga() {
	yield takeLatest(types.GET_DATA, getData)
}
