var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var config = require("./dev.config");
const fs = require("fs");
const path = require("path");

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	https: true,
	key: fs.readFileSync(
		`${path.join(__dirname, "..", "server", "ssl")}/server.key`
	),
	cert: fs.readFileSync(
		`${path.join(__dirname, "..", "server", "ssl")}/server.crt`
	),
	inline: true,
	port: 9090,
	disableHostCheck: true,
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000
	},
	headers: {
		"Access-Control-Allow-Origin": "*"
	}
}).listen(9090, "0.0.0.0", function(err, result) {
	if (err) {
		console.log(err);
	}

	console.log(
		"WDS Listening securely on port 9090; browser: https://lumiary-local.quickframe.com:9000"
	);
});
