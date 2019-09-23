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
  let singleLevelJSON

  console.log('ismetric : ', isMetric)
  const brands = Object.keys(values.data || values)
  console.log('brands : ', brands)

  const brandObjects = brands.map((b) =>
    values.data ? values.data[b] : values[b]
  )
  console.log('brand objects: ', brandObjects)

  getValueinObject = noBrandKeys
    ? values[options.property[0]]
    : brandObjects[0][options.property[0]]
  console.log('get value in object: ', getValueinObject)

  const timeBucket =
    !!options.dateBucket && options.dateBucket !== 'none'
      ? getTimeBucket(getValueinObject)
      : null
  console.log('timebucket : ', timeBucket)
  
  if (!!getValueinObject && getValueinObject.hasOwnProperty('subtotal')) {
    delete getValueinObject.subtotal
  }
  console.log('getValueinObject : ', getValueinObject)
  // If time bucket was  selected, it will change labels to time labels
  // defined within a data object from the api response
  if (timeBucket) {
    datasetsFromValues = Object.keys(getValueinObject).map((item) =>
      timeBucket.map((date) => getValueinObject[item][date])
    )
    labels = timeBucket
  }
  console.log('datasets from values 1: ', datasetsFromValues)

  // If proportionOf was  selected, it will change labels to time labels and it will set up datasets according to selected proportionOf
  if (options.proportionOf) {
    datasetsFromValues = Object.keys(getValueinObject).map((key) =>
      Object.keys(getValueinObject[key]).map(
        (item) =>
          // users should not see the subtotal value in the graphs
          getValueinObject[key][item]
      )
    )
    labels = Object.keys(getValueinObject).map((k) =>
      getLabelWithSuffix(k, options.property[0])
    )
  }
  console.log('datasets from values 2: ', datasetsFromValues)

  // if timebucket or proportionOf werent selected, it will get data from single level json
  if (!timeBucket && !options.proportionOf) {
    datasetsFromValues = Object.keys(getValueinObject).map(
      (key) => getValueinObject[key]
    )
    labels = Object.keys(getValueinObject).map((k) =>
      getLabelWithSuffix(k, options.property[0])
    )
    singleLevelJSON = true
  }
  console.log('datasets from values 3: ', datasetsFromValues)

  if (brands.length > 1 && !noBrandKeys) {
    datasetsFromValues = brandObjects.map((brand, idx) => {
      const brandProp = Object.keys(brand)[0]
      const brandDataObj = brandObjects[idx][brandProp]
      if (!isMetric) {
        return Object.keys(brand[brandProp]).map((key) => brandDataObj[key])
      }
      return brandDataObj
    })
    singleLevelJSON = false
    getValueinObject = brands
  }
  console.log('datasets from values 4: ', datasetsFromValues)

  // metric data comes with sum and percent
  if (isMetric) {
    datasetsFromValues = datasetsFromValues.map((d) =>
      !timeBucket
        ? d.percent || 0
        : Object.keys(d.percents).map((key) => d.percents[key] || 0)
    )
    customKeys = !customKeys ? brands : customKeys
  }
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
  labels = (preparedLabels || useBrandLabels ? brands : labels)
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