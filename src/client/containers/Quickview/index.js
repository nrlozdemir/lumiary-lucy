if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default function (location, cb) {
  return require.ensure([], (require) => {
    cb(null, require('./Main').default)
  })
}
