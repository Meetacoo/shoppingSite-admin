import { Layout, Menu, Icon, Dropdown, Button } from 'antd';

import React,{ Component } from 'react';
import './index.css';
import { request,getUserName,removeUserName } from 'util';
import { USER_LOGOUT } from 'api';

const { Header } = Layout;

class MyHeader extends Component {
	constructor(props){
		super(props);
		this.handleMenuClick = this.handleMenuClick.bind(this);
	}
	handleMenuClick(){
		// console.log('...')
		request({
			url:USER_LOGOUT
		})
		.then((result)=>{
			removeUserName();
			window.location.href = '/login';
		})
	}
	render() {
		const menu = (
			<Menu>
				<Menu.Item onClick={this.handleMenuClick}>
					<a target="_blank" rel="noopener noreferrer"><Icon type='logout'/> 退出</a>
				</Menu.Item>
			</Menu>
		);
		return (
			<Header className="header">
				<div className="logo">
					ashfuy
				</div>
			    <div className="logout">
					<Dropdown overlay={menu} placement="bottomCenter">
						<Button>{getUserName()}</Button>
					</Dropdown>
				</div>
			</Header>
		);
	}
}

export default MyHeader;