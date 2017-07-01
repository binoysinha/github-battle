import './styles/index.scss';
import React from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

const renderApp = Component =>
	render(
		<Router>
			<Component />
		</Router>,
		document.getElementById("root")
	);

renderApp(App);

if (module.hot) module.hot.accept("./components/App", () => renderApp(App));
registerServiceWorker();
