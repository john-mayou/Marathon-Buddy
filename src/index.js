import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

// sass styles
import "./assets/styles/_animations.scss";
import "./assets/styles/_functions.scss";
import "./assets/styles/_global.scss";
import "./assets/styles/_mixins.scss";
import "./assets/styles/_typography.scss";
import "./assets/styles/_utils.scss";
import "./assets/styles/_variables.scss";

// mui
import "@fontsource/roboto";

import store from "./redux/store";

import App from "./components/App/App";

const root = ReactDOM.createRoot(document.getElementById("react-root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
