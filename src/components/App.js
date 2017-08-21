import React, { Component } from 'react';
import { Switch, Route, matchPath } from "react-router-dom";

import Home from './Home';
import ThreadDisplay from './ThreadDisplay/components/ThreadDisplay';
import Login from './Login/components/Login';
import Header from './Header/components/Header';
import User from './User/components/User';

import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';
import { fbConfig} from './data';

class App extends Component {
	constructor(props) {
		super(props)
		const config = fbConfig;
    this.app = firebase.initializeApp(config);
    this.database = this.app.database();
	}

  render() {
    return (
			<div className="container">
				<Header />
				<Route
					render={({ location }) => (
						<Switch key={location.key} location={location}>
						<Route
								exact
								path="/"
								component={Login}
							/>
							<Route
								exact
								path="/home"
								render={(props) => (
										<Home {...props}  database={this.database}/>
								)}/>
								<Route
								exact
								path="/user/:id"
								render={(props) => (
										<User {...props} database={this.database} />
								)}/>
							/>
							<Route
								exact
								path="/chat"
								render={(props) => (
										<ThreadDisplay {...props} database={this.database}/>
								)}/>
                />
							/>
						</Switch>
					)}
				/>
			</div>
		);
  }
}

export default App;
