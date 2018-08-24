import React, { Component } from 'react';
import Login from './pages/login';
import {
	// BrowserRouter as Router,
	HashRouter as Router,
	Route,
	Link,
	Switch,
	Redirect
} from 'react-router-dom';
// import store from './store';
import './App.css';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="box">
					 <Login />
				</div>
			</Router>
		);
	}
}

export default App;