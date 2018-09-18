import React, { Component } from 'react';
import { Breadcrumb,Button,Popconfirm,Message } from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import moment from 'moment';

import MyLayout from 'common/layout';

import './detail.css'


class OrderDetail extends Component {
	constructor(props){
		super(props);
		this.state = {
			orderNo : this.props.match.params.orderNo
		}
		// this.handleOrder();
	};
	/*handleOrder(){
		this.props.handleOrderDetail(this.state.orderNo);
	}*/
	componentDidMount(){
		// this.props.handleOrderDetail(this.state.orderNo);
		if (this.state.orderNo) {
			this.props.handleOrderDetail(this.state.orderNo)
		}
	}
	render(){
		const {
			orderNo,
			createdAt,
			payment,
			paymentTypeDesc,
			shipping,
			productList,
			status,
			statusDesc
		} = this.props.orderDetail;
		let createdTime = "";
		if (createdAt) {
			createdTime = moment(createdAt).format('YYYY-MM-DD HH:mm:ss')
		}
		
		return(
			<MyLayout>
				<Breadcrumb>
					<Breadcrumb.Item>订单管理</Breadcrumb.Item>
					<Breadcrumb.Item>查看订单</Breadcrumb.Item>
				</Breadcrumb>
				{
					orderNo
					? <div className="order-detail">
						<p className="title">订单信息</p>
						<ul className="order-title clearfix">
							<li className="order-no">
								<span className="lable">订单号：</span>
								<span className="text">{orderNo}</span>
							</li>
							<li className="order-created-time">
								<span className="lable">创建时间：</span>
								<span className="text">{createdTime}</span>
							</li>
							<li className="order-shipping-name">
								<span className="lable">收件人：</span>
								<span className="text">{shipping.name}({shipping.phone})</span>
							</li>
							<li className="order-shipping-address">
								<span className="lable">收货地址：</span>
								<span className="text">{shipping.province} {shipping.city} {shipping.address} (邮编：{shipping.zip})</span>
							</li>
							<li className="order-status-desc">
								<span className="lable">订单状态：</span>
								<span className="text">{statusDesc}</span>
							</li>
							<li className="order-payment">
								<span className="lable">订单金额：</span>
								<span className="text">￥ {payment}</span>
							</li>
							<li className="order-paymentTypeDesc">
								<span className="lable">支付方式：</span>
								<span className="text">{paymentTypeDesc}</span>
							</li>
							<li className="order-opreation">
								{
									status == "30"
									? <Popconfirm 
									placement="top" 
									title={"确定已发货"} 
									onConfirm={()=>{
										// alert(orderNo)
										this.props.handleOrderDeliver(orderNo)
										// console.log(orderNo)
									}} 
									okText="确定" 
									cancelText="取消">
									<Button type="primary">发货</Button>
									</Popconfirm>
									: null
								}
							</li>
						</ul>
						<p className="title">商品信息</p>
						<ul className="product-title clearfix">
							<li className="product-info">商品</li>
							<li className="product-price">单价</li>
							<li className="product-count">数量</li>
							<li className="product-totalPrice">小计</li>
						</ul>
						
						{
							productList.map((product,index)=>{
								console.log("product:::",product)
								return <ul className="product-item clearfix" key={index}>
									<li className="product-info">
										<a href={"/product/detail/" + product.productId} target="_blank" className="link">
											<img src={product.images.split(",")[0]} alt="" /> 
											<span>{product.name}</span>
										</a>
									</li>
									<li className="product-price">
										￥ {product.price}
									</li>
									<li className="product-count">
										{product.count}
									</li>
									<li className="product-totalPrice">￥ {product.totalPrice}</li>
								</ul>
							})
						}
					</div>
					: null
				}
				
				
			</MyLayout>
		)
	}
}


const mapStateToProps = (state)=>{
	return {
		orderDetail:state.get('order').get('orderDetail'),
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		handleOrderDetail:(orderNo)=>{
			dispatch(actionCreator.getOrderDetailAction(orderNo))
		},
		handleOrderDeliver:(orderNo)=>{
			console.log("orderNo::::::::",orderNo)
			dispatch(actionCreator.getOrderDeliverAction(orderNo))
		},
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderDetail);