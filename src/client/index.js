import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

if (typeof window === "undefined") {
	global.window = new Object();
}

ReactDOM.render(<App />, document.getElementById("root"));
