function extractDataFn(component) {
    if (component.WrappedComponent && component.WrappedComponent.fetchData) {
        return component.WrappedComponent.fetchData;
    } else if (component.fetchData) {
        return component.fetchData
    } else {
        return null
    }
}

export function resolve(components = []) {
  return components.reduce((results, componentOrComponents) => {
      if (typeof componentOrComponents === 'function') {
          const dataFn = extractDataFn(componentOrComponents)
          return dataFn ? results.concat(dataFn) : results
      } else {
          return results.concat(resolve(Object.values(componentOrComponents)))
      }
  }, [])
}

export const invoke = (fns = [], ...args) => fns.map((fn) => fn(...args))

export default (components, ...args) => invoke(resolve(components), ...args)
