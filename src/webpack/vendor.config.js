const path = require('path')
const webpack = require('webpack')

module.exports = {
	context: process.cwd(),

	resolve: {
		extensions: ['.js', '.jsx', '.json', '.less', '.css'],
		modules: [__dirname, 'node_modules'],
	},

	entry: {
		library: [
			'react',
			'react-dom',
			'react-slick',
			'react-table',
			'react-tabs',
			'react-router',
			'react-router-dom',
			'react-modal',
			'react-date-range',
			'react-id-swiper',

			'redux',
			'redux-form',
			'redux-saga',

			'reselect',

			'qs',
			'prop-types',
			'bourbon',
			'moment',
			'node-neat',
			'classnames',

			'history',
			'immutability-helper',
			'immutable',
			'lodash',
			'swiper',

			'@saypr/bubble-chart',

			'chart.js',
			'react-chartjs-2',
			'chartjs-plugin-datalabels',
			'chartjs-plugin-style',
		],
	},

	output: {
		filename: '[name].dll.js',
		path: path.resolve(__dirname, '../build/library'),
		library: '[name]',
	},

	plugins: [
		new webpack.DllPlugin({
			context: __dirname,
			name: '[name]',
			path: path.join(__dirname, '..', 'build/library/[name].json'),
		}),
	],
}
