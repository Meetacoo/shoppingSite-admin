import React, { Component } from 'react';
import { Layout } from 'antd';
import Header from '../header';
import Sider from '../sider';

const { Content } = Layout;
class MyLayout extends Component {
	render() {
		return (
			<Layout>
				<Layout>
					<Header />
				</Layout>
				<Layout>
					<Sider />
				  <Layout style={{ padding: '0 24px 24px' }}>
				    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
				      {this.props.children}
				    </Content>
				  </Layout>
				</Layout>
			</Layout>
		)
	}
}

export default MyLayout;