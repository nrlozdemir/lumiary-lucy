import qs from 'qs'
import { ajax } from 'Utils/api'

export function getDataFromApi(parameters) {
  return ajax({
    url: parameters.url,
    method: parameters.requestType || 'POST',
    params: qs.stringify(parameters),
  }).then((response) => {
    if (response.error) {
      throw response.error
    }
    return response.data
  })
}
