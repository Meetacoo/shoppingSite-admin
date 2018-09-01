import React, { Component } from 'react';
import {
	BrowserRouter as Router,
	// HashRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import './App.css';

import { getUserName } from 'util';
import Home from 'pages/home/'
import Login from './pages/login';
import User from './pages/user';
import Category from './pages/category';
import Product from './pages/product';
import ErrorPage from './pages/errorpage'

class App extends Component {
	render() {
		const ProtectedRoute = ({component:Component,...rest})=>(
			<Route 
				{...rest}
				render={props=>(
					getUserName()
					?<Component  /> 
					:<Redirect to='/login/'/>
				)}
			/>
		)
		const LoginRoute = ({component:Component,...rest})=>{
			if (getUserName()) {
				return <Redirect to='/' />
			}else{
	 			return <Route {...rest} component={Component}/>
			}
		}
		return (
			<Router>
				<Switch>
					<ProtectedRoute exact path="/" component={ Home } />
					<ProtectedRoute path="/user" component={ User } />
					<ProtectedRoute path="/category" component={ Category } />
					<ProtectedRoute path="/product" component={ Product } />
					<LoginRoute path="/login" component={ Login } />
					<Route component={ ErrorPage } />
				</Switch>
			</Router>
		);
	}
}

export default App;