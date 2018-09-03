import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { InputNumber,Breadcrumb,Button,Table,Divider,Switch,Input } from 'antd';
import { connect } from 'react-redux';



import { actionCreator } from './store';
import MyLayout from 'common/layout';
const Search = Input.Search;


class ProductList extends Component {
	constructor(props){
		super(props);
		this.state = {
			pid:this.props.match.params.pid || 0
		}
		// console.log(this.props.match.params)
	};
	componentDidMount(){
		this.props.handlePage(1);
	};
	render(){
		const {keyword} = this.props;
		const columns = [
			{
				title: 'ID',
				dataIndex: 'id',
				key: 'id',
			},
			{
				title: '商品名称',
				dataIndex: 'name',
				render:(name)=>{
					if (keyword) {
						let reg = new RegExp('('+keyword+')','ig');
						let html = name.replace(reg,'<b style="color:orange">$1</b>')
						return <span dangerouslySetInnerHTML={{__html:html}}></span>
					}else{
						return name;
					}
				}
			},
			{
				title: '商品状态',
				dataIndex: 'status',
				key: 'status',
				render: (status,record)=>{
					return(
						<span>
							<Switch 
								checkedChildren = '在售'
								unCheckedChildren = '下架'
								defaultChecked = {record.status === '0' ? true : false}
								onChange={(checked)=>{
									this.props.handleUpdateStatus(record.id, checked ? 0 : 1)
								}}
							/>
						</span>
					)
				}
			},
			{
				title: 'order',
				dataIndex: 'order',
				key: 'order',
				render:(order,record)=>{
					return <InputNumber 
						defaultValue={order} 
						onBlur={(e)=>{
							this.props.handleUpdateOrder(record.id,e.target.value)
						}} 
					/>
				}
			},
			{
				title: "操作",
				key: "action",
				render:(text, record) => (
					<span>
						<Link to={"/product/save/"+record.id}>
							编辑
						</Link>
						<Divider type="vertical" />
						<Link to={"/product/detail/"+record.id}>查看</Link>
					</span>
				)
			}
		];
		const data = this.props.list.map((product)=>{
			// console.log("product:::::",product)
			return {
				key:product.get('_id'),
				id:product.get('_id'),
				name:product.get('name'),
				order:product.get('order'),
				status:product.get('status'),
				keyword:product.get('keyword')
			}
		}).toJS();

		// console.log(data)
		return(
			<MyLayout>
				<div>
					<Breadcrumb>
						<Breadcrumb.Item>商品管理</Breadcrumb.Item>
						<Breadcrumb.Item>商品列表</Breadcrumb.Item>
					</Breadcrumb>
					<div className="catelist clearfix">	
						<Search
							placeholder="input search text"
							onSearch={value => {
								this.props.handleSearch(value,1)
							}}
							enterButton
							style={{ width: 200 }}
						/>
						<Link to="/product/save" style={{float:'right'}} className="clearfix">
							<Button 
								type="primary" 
								onClick={this.handleAdd} 
								loading={this.props.isAddFatching}
							>
								新增商品
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
		isPageFetching:state.get('product').get('isPageFetching'),
		current:state.get('product').get('current'),
		total:state.get('product').get('total'),
		pageSize:state.get('product').get('pageSize'),
		list:state.get('product').get('list'),
		keyword:state.get('product').get('keyword')
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		handlePage:(page)=>{
			dispatch(actionCreator.getPageAction(page))
		},
		handleUpdateOrder:(id,newOrder)=>{
			dispatch(actionCreator.getUpdateOrderAction(id,newOrder));
		},
		handleUpdateStatus:(id,newStatus)=>{
			dispatch(actionCreator.getUpdateStatusAction(id,newStatus));
		},
		handleSearch:(keyword,page)=>{
			dispatch(actionCreator.getSearchAction(keyword,page))
		}
	}
}

// export default User;
export default connect(mapStateToProps,mapDispatchToProps)(ProductList);