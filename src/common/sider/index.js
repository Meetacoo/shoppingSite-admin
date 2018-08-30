import { Layout, Menu, Icon } from 'antd';

import React,{ Component } from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';
const { Sider } = Layout;
class MySider extends Component {
	render() {
		return (
			<Sider width={200} style={{ background: '#fff' }} className="Sider">
				<Menu
					mode="inline"
					defaultSelectedKeys={['1']}
					defaultOpenKeys={['sub1']}
					style={{ height: '100%', borderRight: 0 }}
				>
					<Menu.Item key="1">
						<NavLink to="/">
							<Icon type="home" />首页
						</NavLink>
					</Menu.Item>
					<Menu.Item key="2">
						<NavLink to="/user"> 
							<Icon type="user" />用户中心
						</NavLink>
					</Menu.Item>
					<Menu.Item key="3">
						<NavLink to="/category">
							<Icon type="bars" />分类管理
						</NavLink>
					</Menu.Item>
					<Menu.Item key="4">
						<NavLink to="/product">
							<Icon type="book" />商品管理
						</NavLink>
					</Menu.Item>
				</Menu>
			</Sider>
		);
	}
}

export default MySider;