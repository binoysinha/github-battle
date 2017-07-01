import '../styles/App.scss';
import React, { Component } from 'react';
import { Switch, Route, matchPath } from "react-router-dom";

import Home from './Home';
import NavBar from './Navbar'
import Battle from './Battle';
import Results from './Results';
import Popular from './Popular';
import NotFound from './dumbComponents/NotFound';

class App extends Component {
  render() {
    return (
			<div className="App-container">
				<NavBar />
				<Route
					render={({ location }) => (
						<Switch key={location.key} location={location}>
							<Route
								exact
								path="/"
								component={Home}
							/>
							<Route
								exact
								path="/battle"
                component={Battle}
							/>
              <Route
								exact
								path="/battle/results"
                component={Results}
							
							/>
							<Route
								exact
								path="/popular"
                component={Popular}
							/>
              <Route component={NotFound} />
						</Switch>
					)}
				/>
			</div>
		);
  }
}

export default App;
