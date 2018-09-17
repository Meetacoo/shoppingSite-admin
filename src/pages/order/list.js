import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb,Button,Input,Table } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';


import { actionCreator } from './store';
import MyLayout from 'common/layout';
const Search = Input.Search;


class OrderList extends Component {
	constructor(props){
		super(props);
		// console.log(this.props.match.params)
	};
	componentDidMount(){
		this.props.handlePage(1);
	};
	render(){
		const {keyword} = this.props;
		const columns = [
			{
				title: '订单号',
				dataIndex: 'orderNo',
				key: 'orderNo',
				render:(orderNo)=>{
					if (keyword) {
						let reg = new RegExp('('+keyword+')','ig');
						let html = orderNo.replace(reg,'<b style="color:orange">$1</b>')
						return <span dangerouslySetInnerHTML={{__html:html}}></span>
					}else{
						return orderNo;
					}
				}
			},
			{
				title: '收件人',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: '订单状态',
				dataIndex: 'statusDesc',
				key: 'statusDesc'
			},
			{
				title: '订单金额',
				dataIndex: 'payment',
				key:' payment'
			},
			{
				title: '创建时间',
				dataIndex: 'createdAt',
				key:' createdAt'
			},
			{
				title: "操作",
				key: "action",
				render:(text, record) => (
					<span>
						<Link to={"/order/detail/"+record.orderNo}>查看</Link>
					</span>
				)
			}
		];
		const data = this.props.list.map((order)=>{
			console.log("order:::::",order)
			return {
				key:order.get('orderNo'),
				name:order.get('shipping').get('name'),
				orderNo:order.get('orderNo'),
				statusDesc:order.get('statusDesc'),
				payment:order.get('payment'),
				createdAt:moment(order.get('createdAt')).format('YYYY-MM-DD HH:mm:ss'),
				keyword:order.get('keyword')
			}
		}).toJS();

		// console.log(data)
		return(
			<MyLayout>
				<div>
					<Breadcrumb>
						<Breadcrumb.Item>订单管理</Breadcrumb.Item>
						<Breadcrumb.Item>订单列表</Breadcrumb.Item>
					</Breadcrumb>
					<div className="clearfix">	
						<Search
							placeholder="输入订单号"
							onSearch={value => {
								this.props.handleSearch(value,1)
							}}
							enterButton
							style={{ width: 200 }}
						/>
					</div>
					<Table 
						dataSource={data} 
						columns={columns}
						pagination={
							{
								current:this.props.current,
								defaultCurrent:this.props.current,
								total:this.props.total,
								pageSize:this.props.pageSize,
							} 
						}
						onChange={(pagination)=>{
							if (keyword) {
								this.props.handleSearch(keyword,pagination.current)
							}else{
								this.props.handlePage(pagination.current)
							}
						}}
						loading={
							{
								spinning:this.props.isPageFetching,
								tip:'数据正在加载'
							}
						}
					/>
				</div>
			</MyLayout>
		)
	}
}

const mapStateToProps = (state)=>{
	return {
		isPageFetching:state.get('order').get('isPageFetching'),
		current:state.get('order').get('current'),
		total:state.get('order').get('total'),
		pageSize:state.get('order').get('pageSize'),
		list:state.get('order').get('list'),
		keyword:state.get('order').get('keyword')
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		handlePage:(page)=>{
			dispatch(actionCreator.getPageAction(page))
		},
		handleSearch:(keyword,page)=>{
			dispatch(actionCreator.getSearchAction(keyword,page))
		}
	}
}

// export default User;
export default connect(mapStateToProps,mapDispatchToProps)(OrderList);