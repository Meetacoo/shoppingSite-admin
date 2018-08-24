import React, { Component } from 'react';
import Login from './pages/login';
import { getUserName } from 'util';
import {
	BrowserRouter as Router,
	// HashRouter as Router,
	Route,
	Link,
	Switch,
	Redirect
} from 'react-router-dom';
// import store from './store';
import './App.css';
import Home from 'pages/home/'
class App extends Component {
	render() {
		const ProtectedRoute = ({component:Component,...rest})=>(
			<Route 
				{...rest}
				render={props=>(

					getUserName()
					?<Component  /> 
					:(<Redirect to='/login'
						/>)
					)
			}
			/>
			)
				
		const LoginRoute = ({component:Component,...rest})=>{
			if (getUserName()) {
				return <Route to='/'/>
			}else{
				return <Route {...rest} component={Component}/>
			}


		}		
				
		return (
			<Router>
				<div className="box">
					<ProtectedRoute path="/" component={ Home } />
					<LoginRoute path="/login" component={ Login } />
				</div>
			</Router>
		);
	}
}

export default App;