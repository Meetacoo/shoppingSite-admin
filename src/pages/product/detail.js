import React, { Component } from 'react';
import { Form, Input, Breadcrumb, InputNumber } from 'antd';
import { connect } from 'react-redux';


import { actionCreator } from './store';
import MyLayout from 'common/layout';
import CategorySelector from './category-selector.js';

import './detail.css'

const FormItem = Form.Item;
// const Option = Select.Option;

class NormalProductDetail extends Component {
	constructor(props){
		super(props);
		this.state = {
			productId : this.props.match.params.productId
		}
	}
	componentDidMount(){
		if (this.state.productId) {
			this.props.handleProductDetail(this.state.productId)
		}
	};
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			this.props.handleSave(err, values);
		});
	}
	render(){
		const {
			parentCategoryId,
			categoryId,
			images,
			detail,
			name,
			description,
			price,
			stock
		} = this.props;
		let imgBox = '';
		if (images) {
			imgBox = images.split(',').map((img,index)=>(
				<li key={index}>
					<img src={img} />
				</li>
			))
			/*fileList = images.split(',').map((img,index)=>({
				uid: index,
				status: 'done',
				url: img,
				response: img
			}))*/
		}
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 4 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 20 },
			},
		};
		return(
			<MyLayout>
				<Breadcrumb>
					<Breadcrumb.Item>商品管理</Breadcrumb.Item>
					<Breadcrumb.Item>查看商品</Breadcrumb.Item>
				</Breadcrumb>
				<Form onSubmit={this.handleSubmit}>
					<FormItem
						{...formItemLayout}
						label="商品名称"
					>
						<Input value={name} disabled={true} />
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="商品描述"
					>
						<Input value={description} disabled={true} />
					</FormItem>
					<FormItem
						{...formItemLayout}
						required={true}
						label="所属分类"
						validateStatus={this.props.categoryIdValidateStatus}
						help={this.props.categoryIdHelp}
					>
						<CategorySelector 
							parentCategoryId={parentCategoryId}
							categoryId={categoryId}
							getCategoryId={(parentCategoryId,categoryId)=>{
								this.props.handleCategory(parentCategoryId,categoryId)
							}}
							boolean={true}
						/>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="商品价格"
					>
						<InputNumber 
							value={price}
							min={0}
							formatter={value => `${value}元`}
							parser={value => value.replace('元', '')}
							disabled={true}
						/>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="商品库存"
					>
						<InputNumber 
							disabled={true}
							value={stock}
							min={0}
							formatter={value => `${value}件`}
							parser={value => value.replace('件', '')}
						/>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="商品图片"
					>
						<ul className='imgBox'>
							{imgBox}
						</ul>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="商品详情"
					>
						<div dangerouslySetInnerHTML={{__html:detail}}></div>
					</FormItem>
				</Form>
			</MyLayout>
		)
	}
}

const ProductDetail = Form.create()(NormalProductDetail);

const mapStateToProps = (state)=>{
	return {
		categoryIdValidateStatus:state.get('product').get('categoryIdValidateStatus'),
		categoryIdHelp:state.get('product').get('categoryIdHelp'),
		isSaveFatching:state.get('product').get('isSaveFatching'),
		parentCategoryId:state.get('product').get('parentCategoryId'),
		categoryId:state.get('product').get('categoryId'),
		images:state.get('product').get('images'),
		detail:state.get('product').get('detail'),
		name:state.get('product').get('editName'),
		description:state.get('product').get('editDescription'),
		price:state.get('product').get('editPrice'),
		stock:state.get('product').get('editStock'),
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		handleProductDetail:(productId)=>{
			dispatch(actionCreator.getEditProductAction(productId))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetail);