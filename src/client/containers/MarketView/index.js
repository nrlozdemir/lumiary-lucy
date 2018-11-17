if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default function (location, cb) {
  //TODO: need refactor later. Somehow require makes trouble.
  switch (location.params.type) {
    case 'audience':
      return require.ensure([], (require) => {
        cb(null, require('./Audience').default)
      })
    case 'competitor':
      return require.ensure([], (require) => {
        cb(null, require('./Competitor').default)
      })
    case 'time':
      return require.ensure([], (require) => {
        cb(null, require('./Time').default)
      })
    case 'use-case':
      return require.ensure([], (require) => {
        cb(null, require('./UseCase').default)
      })
    default:
      return require.ensure([], (require) => {
        cb(null, require('./Platform').default)
      })
  }
}
