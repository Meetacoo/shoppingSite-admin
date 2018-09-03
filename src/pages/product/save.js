import React, { Component } from 'react';
import { Form, Input, Button, Breadcrumb, InputNumber } from 'antd';
import { connect } from 'react-redux';


import { actionCreator } from './store';
import MyLayout from 'common/layout';
import UploadImage from 'common/upload-image';
import RichEditor from 'common/rich-editor';
import CategorySelector from './category-selector.js';
import { PRODUCT_UPLOAD_IMAGE,PRODUCT_UPLOAD_DETAIL_IMAGE } from 'api';

const FormItem = Form.Item;
// const Option = Select.Option;

class NormalProductSave extends Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			productId : this.props.match.params.productId
		}
	}
	componentDidMount(){
		if (this.state.productId) {
			this.props.handleEditProduct(this.state.productId)
		}
	};
	
	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			values.id = this.state.productId;
			this.props.handleSave(err, values);
		});
	}
	render(){
		const {
			parentCategoryId,
			categoryId,
			images,
			detail,
			editName,
			editDescription,
			editPrice,
			editStock
		} = this.props;
		
		let fileList = [];
		if (images) {
			fileList = images.split(',').map((img,index)=>({
				uid: index,
				status: 'done',
				url: img,
				response: img
			}))
		}
		// console.log(fileList)

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
					<Breadcrumb.Item>
						{
							this.state.productId
							? '编辑商品'
							: '添加商品'
						}
					</Breadcrumb.Item>
				</Breadcrumb>
				<Form onSubmit={this.handleSubmit}>
					<FormItem
						{...formItemLayout}
						label="商品名称"
					>
						{getFieldDecorator('name', {
							rules: [{
								required: true, message: '请输入商品名称',
							}],
							initialValue:editName
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
							initialValue:editDescription
						})(
							<Input />

						)}
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
						/>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="商品价格"
					>
						{getFieldDecorator('price', {
							rules: [{
								required: true, message: '请输入商品价格',
							}],
							initialValue:editPrice
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
							initialValue:editStock
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
						<UploadImage 
							action={PRODUCT_UPLOAD_IMAGE}
							max={3}
							fileList={fileList}
							getFileList={
								(fileList)=>{
									// console.log(fileList)
									this.props.handleImages(fileList)
								}
							}
						/>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="商品详情"
					>
						<RichEditor 
							action={PRODUCT_UPLOAD_DETAIL_IMAGE}
							getRichEditorValue = {
								(value)=>{
									console.log(value)
									this.props.handleDetail(value)
								}
							}
							detail={detail}
						/>
					</FormItem>
					<FormItem {...tailFormItemLayout}>
						<Button 
							type="primary" 
							onClick={this.handleSubmit} 
							loading={this.props.isSaveFatching}
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
		categoryIdValidateStatus:state.get('product').get('categoryIdValidateStatus'),
		categoryIdHelp:state.get('product').get('categoryIdHelp'),
		isSaveFatching:state.get('product').get('isSaveFatching'),
		parentCategoryId:state.get('product').get('parentCategoryId'),
		categoryId:state.get('product').get('categoryId'),
		images:state.get('product').get('images'),
		detail:state.get('product').get('detail'),
		editName:state.get('product').get('editName'),
		editDescription:state.get('product').get('editDescription'),
		editPrice:state.get('product').get('editPrice'),
		editStock:state.get('product').get('editStock'),
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		handleSave:(err,values)=>{
			dispatch(actionCreator.getSaveAction(err,values))
		},
		handleCategory:(parentCategoryId,categoryId)=>{
			dispatch(actionCreator.getSetCategoryAction(parentCategoryId,categoryId))
		},
		handleImages:(fileList)=>{
			dispatch(actionCreator.getSetImagesAction(fileList))
		},
		handleDetail:(value)=>{
			dispatch(actionCreator.getSetDetailAction(value))
		},
		handleEditProduct:(productId)=>{
			dispatch(actionCreator.getEditProductAction(productId))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductSave);