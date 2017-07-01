import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class TopBar extends Component {
	render() {
		return (
			<div className="top-bar">
				<nav>
					<NavLink activeClassName="active" exact to="/">Home</NavLink>
					<NavLink activeClassName="active" to="/battle">Battle</NavLink>
					<NavLink activeClassName="active" to="/popular">Popular</NavLink>
				</nav>
			</div>
		)
	}
}