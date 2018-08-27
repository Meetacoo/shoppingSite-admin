import React, { Component } from 'react';
import { Table,Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import moment from 'moment';


import MyLayout from 'common/layout';

// import store from './store';

const columns = [
	{
		title: '用户名',
		dataIndex: 'username',
		key: 'username',
	},
	{
		title: '是否管理员',
		dataIndex: 'isAdmin',
		key: 'isAdmin',
		render:isAdmin => (isAdmin ? '是' : '否')
	},
	{
		title: '邮箱',
		dataIndex: 'email',
		key: 'email',
	},
	{
		title: '手机',
		dataIndex: 'phone',
		key: 'phone',
	},
	{
		title: '创建时间',
		dataIndex: 'createdAt',
		key: 'createdAt',
	}
];


/*const dataSource = [{
	key: '1',
	username: 'admin',
	isAdmin: true,
}, {
	key: '2',
	username: 'text1',
	isAdmin: false,
}];*/

class User extends Component {
	componentDidMount(){
		this.props.handlePage();
	};
	render() {
		/*const data = [];
		for (let i = 0; i < 500; i++) {
			data.push({
				key: i,
				username: 'test' + i,
				isAdmin: false,
			})
		}*/
		// console.log("user111:::::",this.props.list)
		const data = this.props.list.map((user)=>{
			console.log("user:::::",user)
			return {
				key:user.get('_id'),
				username:user.get('username'),
				isAdmin:user.get('isAdmin'),
				email:user.get('email'),
				phone:user.get('phone'),
				createdAt:moment(user.get('createdAt')).format('YYYY-MM-DD HH:mm:ss')
			}
		}).toJS();
		console.log(data)
		return (
			<div>
				<MyLayout>
					<Breadcrumb>
						<Breadcrumb.Item>用户管理</Breadcrumb.Item>
						<Breadcrumb.Item>用户列表</Breadcrumb.Item>
					</Breadcrumb>
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
							// console.log(pagination);
							this.props.handlePage(pagination.current)
						}}
						loading={
							{
								spinning:this.props.isFatching,
								tip:'数据正在加载'
							}
						}
					/>
				</MyLayout>
			</div>
		);
		/*return (
			<div>
				<MyLayout>
					<Table 
						dataSource={dataSource} 
						columns={columns} 
						pagination={
							{
							} 
						}
					/>
				</MyLayout>
			</div>
		);*/
	}
}
const mapStateToProps = (state)=>{
	return {
		isFatching:state.get('user').get('isFatching'),
		current:state.get('user').get('current'),
		total:state.get('user').get('total'),
		pageSize:state.get('user').get('pageSize'),
		list:state.get('user').get('list')
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		handlePage:(page)=>{
			dispatch(actionCreator.getPageAction(page))
		}
	}
}

// export default User;
export default connect(mapStateToProps,mapDispatchToProps)(User);