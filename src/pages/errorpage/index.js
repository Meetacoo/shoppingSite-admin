import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'antd';
// import store from './store';

class ErrorPage extends Component {
	render() {
		return (
			<div className="box">
				<Alert message="Error Text" type="error" />
				<Link to="/">返回首页</Link>
			</div>
		);
	}
}

export default ErrorPage;