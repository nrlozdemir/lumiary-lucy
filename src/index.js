require("babel-register")({
	presets: ["env", "react", "stage-2"]
});

require.extensions[".scss"] = () => {
	return;
};

require.extensions[".css"] = () => {
	return;
};

require("@babel/polyfill");
const server = require("./server/index");

if (process.env.NODE_ENV === "development") {
	server(require("./webpack/server"));
} else {
	server(() => console.log(`Starting server on port: ${process.env.PORT}`));
}
