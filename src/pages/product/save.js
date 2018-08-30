import React, { Component } from 'react';
import { Form, Input, Button, Breadcrumb, InputNumber } from 'antd';
import { connect } from 'react-redux';


import { actionCreator } from './store';
import MyLayout from 'common/layout';
import UploadImage from 'common/upload-image';
import CategorySelector from './category-selector.js';

const FormItem = Form.Item;
// const Option = Select.Option;

class NormalProductSave extends Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount(){
		this.props.LoadLevelOneCategories();
	}
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.handleAdd(values);
			}
		});
	}
	render(){
		const { getFieldDecorator } = this.props.form;
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
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 4,
				},
				sm: {
					span: 16,
					offset: 4,
				},
			},
		};
		return(
			<MyLayout>
				<Breadcrumb>
					<Breadcrumb.Item>商品管理</Breadcrumb.Item>
					<Breadcrumb.Item>添加商品</Breadcrumb.Item>
				</Breadcrumb>
				<Form onSubmit={this.handleSubmit}>
					<FormItem
						{...formItemLayout}
						label="商品名称 描述 "
					>
						{getFieldDecorator('name', {
							rules: [{
								required: true, message: '请输入商品名称',
							}],
						})(
							<Input />

						)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="商品描述"
					>
						{getFieldDecorator('description', {
							rules: [{
								required: true, message: '请输入商品描述',
							}],
						})(
							<Input />

						)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="所属分类"
					>
						{getFieldDecorator('pid', {
							rules: [{
								required: true, message: '请选择父级分类',
							}],
						})(
							<CategorySelector 
								getCategoryId={(pid,id)=>{
									console.log(pid,id)
								}}
							/>
						)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="商品价格"
					>
						{getFieldDecorator('price', {
							rules: [{
								required: true, message: '请输入商品价格',
							}],
						})(
							<InputNumber 
								min={0}
								formatter={value => `${value}元`}
								parser={value => value.replace('元', '')}
							/>
						)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="商品库存"
					>
						{getFieldDecorator('stock', {
							rules: [{
								required: true, message: '请输入商品库存',
							}],
						})(
							<InputNumber 
								min={0}
								formatter={value => `${value}件`}
								parser={value => value.replace('件', '')}
							/>

						)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="商品图片"
					>
						<UploadImage />
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="商品详情"
					>
					</FormItem>
					<FormItem {...tailFormItemLayout}>
						<Button 
							type="primary" 
							onClick={this.handleSubmit} 
							loading={this.props.isAddFatching}
						>
							提交
						</Button>
					</FormItem>
				</Form>
			</MyLayout>
		)
	}
}

const ProductSave = Form.create()(NormalProductSave);

const mapStateToProps = (state)=>{
	return {
		isAddFatching:state.get('category').get('isAddFatching'),
		levelonecategories:state.get('category').get('levelonecategories')
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		handleAdd:(values)=>{
			const action = actionCreator.getAddAction(values)
			dispatch(action)
		},
		LoadLevelOneCategories:()=>{
			const action = actionCreator.getLevelOneCategoriesAction()
			dispatch(action)
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductSave);