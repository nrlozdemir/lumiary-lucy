if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default function(location, cb) {
  require.ensure([], (require) => {
    cb(null, require('./Main').default, location.params.type )
  })
}
