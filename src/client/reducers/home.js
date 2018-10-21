export const types = {
	REQUEST_HOME: 'HOME/REQUEST',
	RECEIVE_HOME: 'HOME/RECEIVE/SUCCESS',
	RECEIVE_HOME_ERROR: 'HOME/RECEIVE/ERROR'
}

export const actions = {
	requestHome: () => ({ type: types.REQUEST_HOME })
}

export const initialState = {
	error: false,
	errorMessage: null,
	lumascape: null,
	measure: null,
	phoneSlider: null,
	priceSlider: null,
}

const reducer = (state = initialState, action) => {
	const { payload } = action;

	switch (action.type) {
		case types.RECEIVE_HOME:
			return {
				...state,
				error: false,
				errorMessage: null,
				...payload
			};

		case types.RECEIVE_HOME_ERROR:
			return {
				...state,
				error: payload.error,
				errorMessage: payload.errorMessage
			};

		default:
			return state
	}
}

export default reducer
