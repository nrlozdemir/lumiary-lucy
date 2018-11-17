if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default function (location, cb) {
  //TODO: need refactor later. Somehow require makes trouble.
  switch (location.params.type) {
    case 'audience':
      return require.ensure([], (require) => {
        cb(null, require('./pages/Audience').default)
      })
    case 'competitor':
      return require.ensure([], (require) => {
        cb(null, require('./pages/Competitor').default)
      })
    case 'time':
      return require.ensure([], (require) => {
        cb(null, require('./pages/Time').default)
      })
    case 'use-case':
      return require.ensure([], (require) => {
        cb(null, require('./pages/UseCase').default)
      })
    default:
      return require.ensure([], (require) => {
        cb(null, require('./pages/Platform').default)
      })
  }
}
