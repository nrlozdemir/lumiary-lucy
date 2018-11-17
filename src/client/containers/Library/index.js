if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default function (location, cb) {
  if (Boolean(location.params.id)) {
    return require.ensure([], (require) => {
      cb(null, require('./Main').default)
    })
  }

  return require.ensure([], (require) => {
    cb(null, require('./Home/Main').default)
  })
}
