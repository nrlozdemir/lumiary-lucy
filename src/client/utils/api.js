import axios from "axios";
import { API_ROOT, API_VERSION } from "Utils/globals";

export function handleResponse(response) {
	if (!response.ok) {
		const err = new Error(response.statusText);
		err.status = response.status;
		throw err;
	}
	return response.json();
}

export const buildApiUrl = (url, params) => {
	let requestUrl = `${API_ROOT}/${API_VERSION}${url}`;

	if (params) {
		let q = [];
		for (let key in params) {
			if (params[key].length) {
				let subkeys = [];
				for (let subkey in params[key]) {
					subkeys.push(`${JSON.stringify(params[key][subkey])}`);
				}
				q.push(`${key}=[${subkeys}]`);
			} else {
				q.push(`${key}=${params[key]}`);
			}
		}

		requestUrl += `?${q.join("&")}`;
	}

	return requestUrl;
};

export const baseRequest = (token, method) => {
	return {
		method: method || "POST",
		headers: {
			Authorization: `Bearer ${token}`
		}
	};
};

export function ajax({ method, params, token, url }) {
	// console.log(
	//   '===== Utils/Api/Request =====',
	//   '\n method: ', method,
	//   '\n params: ', params,
	//   '\n token: ', token,
	//   '\n url: ', url,
	// )

	const edittedUrl =
		url.indexOf("https://") > -1 ? url : `${API_ROOT}/${API_VERSION}${url}`;

	return axios({
		method: method || "post",
		headers: token ? { Authorization: `Bearer ${token}` } : null,
		url: edittedUrl,
		data: params ? params : null
	})
		.then(res => {
			// console.log('===== Utils/Api/ajax; axios success =====\n', res);
			return res;
		})
		.catch(err => {
			// console.log('===== Utils/Api/ajax; axios error =====\n', err);
			return err.response;
		});
}

export function findIdDetail(data, detailId, detailName) {
	const currentId = data.filter(({ id }) => id == detailId);

	console.log(currentId)

	if (currentId && currentId.length) {
		return currentId[0][detailName];
	}

	return {};
}
