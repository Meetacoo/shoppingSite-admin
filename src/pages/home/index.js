import React, { Component } from 'react';
import { Card } from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from './store';

import MyLayout from 'common/layout';

import './index.css';

class Home extends Component {
	componentDidMount(){
		this.props.handleCount();
	}
	render() {
		return (
			<div className="Home ant-card">
				<MyLayout>
					<Card title="用户数" bordered={true} hoverable={true}>
						<p>{this.props.usernum}</p>
					</Card>
					<Card title="订单数" bordered={true} hoverable={true}>
						<p>{this.props.ordernum}</p>
					</Card>
					<Card title="商品数" bordered={true} hoverable={true}>
						<p>{this.props.goodsnum}</p>
					</Card>
				</MyLayout>
			</div>
		);
	}
}
const mapStateToProps = (state)=>{
	return {
		usernum:state.get('home').get('usernum'),
		ordernum:state.get('home').get('ordernum'),
		goodsnum:state.get('home').get('goodsnum')
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		handleCount:()=>{
			const action = actionCreator.getCountAction();
			dispatch(action)
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);