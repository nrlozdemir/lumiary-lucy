import {
  getTimeBucket,
  getLabelWithSuffix,
} from 'Utils'

export const mapBrands = (values) => {
  return Object.keys(values.data || values)
}

export const setValueinObject = (noBrandKeys, values = {}, brandObjects, options = {}) => {
  const { property } = options
  console.log('noBrandKeys : ', noBrandKeys)
  console.log('values : ', values)
  console.log('options : ', options)
  console.log('brandObjects : ', brandObjects)
  return noBrandKeys
  ? values[property[0]]
  : brandObjects[0][property[0]]
}

export const mapBrandObjects = (brands, values) => {
  return brands.map((b) => values.data ? values.data[b] : values[b])
}

export const returnTimeBucket = (options = {}, getValueinObject) => {
  return !!options.dateBucket && options.dateBucket !== 'none'
      ? getTimeBucket(getValueinObject)
      : null
}

export const mapValueinObjWithTimeBucket = (getValueinObject = {}, timeBucket = []) => {
  return Object.keys(getValueinObject).map((item) =>
    timeBucket.map((date) => getValueinObject[item][date])
  )
}

export const getProportionValues = ({
  getValueinObject = {},
  options,
  datasetsFromValues = {},
  labels = {},
  timeBucket,
  singleLevelJSON
  }) => {
  let datasetsData = datasetsFromValues
  let labelsData = labels
  let singleLevelJSONData = singleLevelJSON
  console.log('options 2 : ', options)

  if (options.proportionOf) {
    datasetsData = Object.keys(getValueinObject).map((key) =>
      Object.keys(getValueinObject[key]).map(
        (item) =>
          // users should not see the subtotal value in the graphs
          getValueinObject[key][item]
      )
    )
    labelsData = Object.keys(getValueinObject).map((k) =>
      getLabelWithSuffix(k, options.property[0])
    )
  }

  // if timebucket or proportionOf werent selected, it will get data from single level json
  if (!timeBucket && !options.proportionOf) {
    datasetsData = Object.keys(getValueinObject).map(
      (key) => getValueinObject[key]
    )
    labelsData = Object.keys(getValueinObject).map((k) =>
      getLabelWithSuffix(k, options.property[0])
    )
    singleLevelJSONData = true
  }

  return {
    datasetsData,
    labelsData,
    singleLevelJSONData
  }
}

export const checkBrandsWithKeys = ({
  brands,
  brandObjects,
  noBrandKeys,
  datasetsFromValues,
  getValueinObject,
  singleLevelJSON,
  isMetric
}) => {
  let datasetsData = datasetsFromValues
  let getValueinObjectData = getValueinObject
  let singleLevelJSONData = singleLevelJSON
  if (brands.length > 1 && !noBrandKeys) {
    datasetsData = brandObjects.map((brand, idx) => {
      const brandProp = Object.keys(brand)[0]
      const brandDataObj = brandObjects[idx][brandProp]
      if (!isMetric) {
        return Object.keys(brand[brandProp]).map((key) => brandDataObj[key])
      }
      return brandDataObj
    })
    singleLevelJSONData = false
    getValueinObjectData = brands
  }
  return {
    datasetsData,
    getValueinObjectData,
    singleLevelJSONData
  }
}

const isMetricMapsData = ({ isMetric, datasetsFromValues, timeBucket, customKeys, brands }) => {
  let customKeysData = customKeys
  let datasetsData = datasetsFromValues

  if (isMetric) {
    datasetsData = datasetsData.map((d) =>
      !timeBucket
        ? d.percent || 0
        : Object.keys(d.percents).map((key) => d.percents[key] || 0)
    )
    customKeysData = customKeysData || brands
  }

  return {
    datasetsData,
    customKeysData  
  }
}

export const getLabelsCondition = ({
  preparedLabels,
  useBrandLabels,
  brands,
  labels
}) => {
  return (preparedLabels || useBrandLabels ? brands : labels)
}

export const setDatasetsFromValues = ({
  values,
  noBrandKeys,
  options,
  isMetric,
  preparedLabels,
  preparedDatasets,
  useBrandLabels,
  useBrands,
  argKeys,
  customValueKey,
  customValueKeyGetAll
}) => {
  console.log('=====================setdatasetsfromvalues======================== start')
  let getValueinObject
  let datasetsFromValues = preparedDatasets
  let labels
  let customKeys = argKeys
  let singleLevelJSON = false

  console.log('ismetric : ', isMetric)
  const brands = mapBrands(values)
  console.log('brands : ', brands)

  const brandObjects = mapBrandObjects(brands, values)
  console.log('brand objects: ', brandObjects)

  getValueinObject = setValueinObject(noBrandKeys, values, brandObjects, options)
  console.log('get value in object: ', getValueinObject)

  const timeBucket = returnTimeBucket(options, getValueinObject)
  console.log('timebucket : ', timeBucket)
  
  if (!!getValueinObject && getValueinObject.hasOwnProperty('subtotal')) {
    delete getValueinObject.subtotal
  }
  console.log('getValueinObject : ', getValueinObject)
  // If time bucket was  selected, it will change labels to time labels
  // defined within a data object from the api response
  if (timeBucket) {
    datasetsFromValues = mapValueinObjWithTimeBucket(getValueinObject, timeBucket)
    labels = timeBucket
  }
  console.log('datasets from values 1: ', datasetsFromValues)
  console.log('options sss : ', options)
  // If proportionOf was  selected, it will change labels to time labels and it will set up datasets according to selected proportionOf
  const getProportionValuesData = getProportionValues({
    getValueinObject,
    options,
    datasetsFromValues,
    labels,
    timeBucket,
    singleLevelJSON
  })
  datasetsFromValues = getProportionValuesData.datasetsData
  labels = getProportionValuesData.labelsData
  singleLevelJSON = getProportionValuesData.singleLevelJSONData
  console.log('datasets from values 2: ', datasetsFromValues)


  console.log('datasets from values 3: ', datasetsFromValues)

  const brandsWithKeys = checkBrandsWithKeys({
    brands,
    brandObjects,
    noBrandKeys,
    datasetsFromValues,
    getValueinObject,
    singleLevelJSON,
    isMetric
  })
  datasetsFromValues = brandsWithKeys.datasetsData
  getValueinObject = brandsWithKeys.getValueinObjectData
  singleLevelJSON = brandsWithKeys.singleLevelJSONData

  console.log('datasets from values 4: ', datasetsFromValues)

  // metric data comes with sum and percent
  const dataIfIsMetric = isMetricMapsData({
    datasetsFromValues,
    isMetric,
    timeBucket,
    customKeys,
    brands
  })
  datasetsFromValues = dataIfIsMetric.datasetsData
  customKeys = dataIfIsMetric.customKeysData
  console.log('datasets from values 5: ', datasetsFromValues)
  // if dataset values type of object, get value in the object
  if (
    datasetsFromValues &&
    typeof datasetsFromValues[0] === 'object' &&
    !Array.isArray(datasetsFromValues[0])
  ) {
    datasetsFromValues = datasetsFromValues.map((d) =>
      customValueKey
        ? d[customValueKey] || 0
        : customValueKeyGetAll
        ? d
        : d.value || 0
    )
  }
  console.log('datasets from values 6: ', datasetsFromValues)
  // You can pass prepared labels or datasets in arg
  labels = getLabelsCondition({
    preparedLabels,
    useBrandLabels,
    brands,
    labels
  })
  if(useBrands) {
    getValueinObject = brands
  }
  const result = {
    getValueinObject,
    datasetsFromValues,
    labels,
    customKeys,
    singleLevelJSON,
    brands
  }
  return result
  console.log('labels : ', labels)
  console.log('get value in obj : ', getValueinObject)
  console.log('=====================setdatasetsfromvalues======================== end')
}