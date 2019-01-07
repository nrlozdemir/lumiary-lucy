import basicAuth from "express-basic-auth";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import Routes from "../../client/routes";
import errMsg from "./../utils/error";
import store from "../../client/configureStore";
import { Provider } from "react-redux";

const cache = require("express-redis-cache")({
	host: process.env.REDIS_HOST
});

cache.del("*", (error, numDeleted) =>
	console.log(`Deleted ${numDeleted} cache entries.`)
); // Force-clear cache on app startup

module.exports = app => {
	// HEALTH
	// =============================================================================
	app.use(
		"/healthcheck",
		require("express-healthcheck")({
			healthy: function() {
				return { status: "upppp" };
			}
		})
	);

	if (
		process.env.ENVIRONMENT === "qa" ||
		process.env.ENVIRONMENT === "staging"
	) {
		app.use(
			basicAuth({
				users: {
					[process.env.BASIC_AUTH_USER]: process.env.BASIC_AUTH_PASSWORD
				},
				challenge: true
			})
		);
	}

	//S3 Uploads
	app.use(
		"/s3",
		require("react-dropzone-s3-uploader/s3router")({
			bucket: `${app.settings.s3bucket}/uploads`,
			region: "us-east-1", // optional
			headers: { "Access-Control-Allow-Origin": "*" }, // optional
			ACL: "private" // this is the default - set to `public-read` to let anyone view uploads
		})
	);

	app.get(
		"/*",
		cache.route({
			prefix: "lumiere"
		}),
		(req, res) => {
			const context = {};

			//render components
			const app = ReactDOMServer.renderToString(
				<Provider store={store}>
					<StaticRouter location={req.url} context={context}>
						<Routes />
					</StaticRouter>
				</Provider>
			);

			res.render("index", {
				state: JSON.stringify(store.getState()),
				content: app
			});
		}
	);
};
