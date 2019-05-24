import qs from 'qs'
import { ajax } from 'Utils/api'

export function getReportDataApi(parameters) {
  return ajax({
    url: '/report',
    method: 'POST',
    params: qs.stringify(parameters),
  }).then((response) => {
    if (response.error) {
      throw response.error
    }
    return response.data
  })
}

export function getMetricDataApi({ metric, platform, dateRange }, values) {
  return ajax({
    url: `/metric/totals?metric=${metric}&platform=${platform}&daterange=${dateRange}`,
    method: 'GET',
    params: qs.stringify(values),
  }).then((response) => {
    if (response.error) {
      throw response.error
    }
    return response.data
  })
}
