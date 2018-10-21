if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
	
export default {
    header: require('./handlers/Header').default,
    main: require('./handlers/Main').default
}