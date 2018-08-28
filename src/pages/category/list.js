import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { InputNumber,Breadcrumb,Button,Table,Divider,Modal } from 'antd';
import { connect } from 'react-redux';



import { actionCreator } from './store';
import MyLayout from 'common/layout';


class CategoryList extends Component {
	constructor(props){
		super(props);
		this.state = {
			pid:this.props.match.params.pid || 0
		}
		// console.log(this.props.match.params)
	};
	componentDidMount(){
		this.props.handlePage(this.state.pid,1);
	};
	componentDidUpdate(preProps,preState){
		// console.log(preProps);
		// console.log(this.props);
		let oldPath = preProps.location.pathname;
		let newPath = this.props.location.pathname;
		if (oldPath !== newPath) {
			// console.log(this.props.match.params.pid);
			let newPid = this.props.match.params.pid || 0;
			this.setState ({
				pid:newPid
			},()=>{
				this.props.handlePage(newPid,1);
			})
		}
	}
	render(){
		const columns = [
			{
				title: 'ID',
				dataIndex: 'id',
				key: 'id',
			},
			{
				title: '分类名称',
				dataIndex: 'name',
				key: 'name'
			},
			{
				title: 'order',
				dataIndex: 'order',
				key: 'order',
				render:(order,record)=>{
					return <InputNumber defaultValue={order}  />
				}
			},
			{
				title: "操作",
				key: "action",
				render:(text, record) => (
					<span>
						<a href="javascript:;"
							onClick={()=>{
								this.props.showUpdateModal(record.id,record.name)
							}}
						>
							更新名称
						</a>
						{
							record.pid == 0
							? (<span>
								<Divider type="vertical" />
								<Link to={"/category/"+record.id}>查看子分类</Link>
							</span>)
							: null
						}
					</span>
				)
			}
		];
		const data = this.props.list.map((category)=>{
			// console.log("category:::::",category)
			return {
				key:category.get('_id'),
				id:category.get('_id'),
				pid:category.get('pid'),
				name:category.get('name'),
				order:category.get('order'),
			}
		}).toJS();
		// console.log(data)
		return(
			<MyLayout>
				<div>
					<Breadcrumb>
						<Breadcrumb.Item>分类管理</Breadcrumb.Item>
						<Breadcrumb.Item>分类列表</Breadcrumb.Item>
					</Breadcrumb>
					<div className="catelist clearfix">
						<h4 style={{float:'left'}}>
							父类ID:{ this.state.pid }
						</h4>
						<Link to="/category/add" style={{float:'right'}} className="clearfix">
							<Button 
								type="primary" 
								onClick={this.handleAdd} 
								loading={this.props.isAddFatching}
							>
								新增分类
							</Button>
						</Link>
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
							this.props.handlePage(this.state.pid,pagination.current)
						}}
						loading={
							{
								spinning:this.props.isPageFetching,
								tip:'数据正在加载'
							}
						}
					/>
					<Modal
						title="修改分类名称"
						visible={this.props.updateModalVisible}
						onOk={this.props.handleUpdateName}
						onCancel={this.props.handleCancelName}
					>
						<p>Some contents...</p>
					</Modal>
				</div>
			</MyLayout>
		)
	}
}

const mapStateToProps = (state)=>{
	return {
		isPageFetching:state.get('category').get('isPageFetching'),
		current:state.get('category').get('current'),
		total:state.get('category').get('total'),
		pageSize:state.get('category').get('pageSize'),
		list:state.get('category').get('list'),
		updateModalVisible:state.get('category').get('updateModalVisible')
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		handlePage:(pid,page)=>{
			dispatch(actionCreator.getPageAction(pid,page))
		},
		showUpdateModal:(updateId,updateName)=>{
			dispatch(actionCreator.getShowUpdateModalAction(updateId,updateName));
		}
	}
}

// export default User;
export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);