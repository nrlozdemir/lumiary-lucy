const path = require("path");
const webpack = require("webpack");

module.exports = {
	context: process.cwd(),

	resolve: {
		extensions: [".js", ".jsx", ".json", ".less", ".css"],
		modules: [__dirname, "node_modules"]
	},

	entry: {
		library: [
			"react",
			"react-dom",
			"react-loadable",
			"react-masonry-component",
			"react-slick",
			"react-tabs",
			"react-router",
			"react-modal",
			"react-dropzone-s3-uploader",
			"react-jw-player",
			"react-rangeslider",
			"react-social-login",
			"react-stay-scrolled",
			"react-twitter-auth",
			"react-dnd",
			"react-dnd-html5-backend",

			"redux",
			"redux-form",
			"redux-saga",
			"redux-persist",

			"reselect",

			"qs",
			"prop-types",
			"bourbon",
			"moment",
			"node-neat",
			"classnames",

			"slate",
			"slate-react",
			"history",
			"jwt-decode",
			"immutability-helper",
			"immutable",
			"isomorphic-fetch",
			"lodash",

			"chart.js",
			"react-chartjs-2",
			"chartjs-plugin-annotation",
			"chartjs-plugin-datalabels"
		]
	},

	output: {
		filename: "[name].dll.js",
		path: path.resolve(__dirname, "../build/library"),
		library: "[name]"
	},

	plugins: [
		new webpack.DllPlugin({
			context: __dirname,
			name: "[name]",
			path: path.join(__dirname, "..", "build/library/[name].json")
		})
	]
};
