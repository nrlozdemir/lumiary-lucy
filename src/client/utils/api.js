import axios from 'axios'
import { API_ROOT, API_VERSION } from 'Utils/globals'

export function handleResponse(response) {
	if (!response.ok) {
		const err = new Error(response.statusText)
		err.status = response.status
		throw err
	}
	return response.json()
}

export const buildApiUrl = (url, params) => {
	let requestUrl = `${API_ROOT}/${API_VERSION}${url}`

	if (params) {
		let q = []
		for (let key in params) {
			if (params[key].length) {
				let subkeys = []
				for (let subkey in params[key]) {
					subkeys.push(`${JSON.stringify(params[key][subkey])}`)
				}
				q.push(`${key}=[${subkeys}]`)
			} else {
				q.push(`${key}=${params[key]}`)
			}
		}

		requestUrl += `?${q.join('&')}`
	}

	return requestUrl
}

export const baseRequest = (token, method) => {
	return {
		method: method || 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}
}

/**
 * Status code check.
 * @constructor
 * @param {number} code - The code of the response status.
 */
function statusCodeValid(code) {
	return code >= 200 && code < 300 && code !== 204 && code !== 205
}

/**
 * Axios Request.
 * @constructor
 * @param {string} method - The method of the request.
 * @param {object} params - The params of the request.
 * @param {string} token - The token of the request.
 * @param {string} url - The url of the request.
 * @param {string} responseType - The responseType of the request.
 */
export function ajax({
	method = 'post',
	params: data = null,
	token,
	url,
	headers = null,
	responseType = null,
	consoleDebug = false,
}) {
	if (consoleDebug) {
		console.log(
			'===== Utils/Api/Request =====',
			'\n method: ',
			method,
			'\n data: ',
			data,
			'\n token: ',
			token,
			'\n url: ',
			url,
			'\n headers: ',
			headers,
			'\n responseType: ',
			responseType
		)
	}

	return new Promise((resolve) => {
		try {
			if (!url) {
				throw new Error('url must be defined')
			}
			url =
				url.indexOf('https://') > -1 ? url : `${API_ROOT}/${API_VERSION}${url}`
			headers = token ? { Authorization: `Bearer ${token}` } : headers
		} catch (error) {
			resolve({
				error,
			})
		}

		const req = {
			method,
			headers,
			url,
			responseType,
		}

		if ('get' == method) {
			req.params = data ? data : null
		} else {
			req.data = data ? data : null
		}

		axios(req)
			.then((response) => {
				if (!statusCodeValid(response.status)) {
					resolve({
						error: new Error(`Status code ${response.status} is not valid`),
						status: response.status,
					})
				}
				resolve(response)
			})
			.catch((err) => {
				resolve({
					...err.response,
					error: err,
				})
			})
	})
}

export function findIdDetail(data, detailId, detailName) {
	const currentId = data.filter(({ id }) => id == detailId)

	if (currentId && currentId.length) {
		return currentId[0][detailName]
	}

	return {}
}
