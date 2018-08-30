import React, { Component } from 'react';
import { Form, Input, Select, Button, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from './store';

import MyLayout from 'common/layout';

const FormItem = Form.Item;
const Option = Select.Option;

class NormalCategoryAdd extends Component {
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
					<Breadcrumb.Item>分类管理</Breadcrumb.Item>
					<Breadcrumb.Item>添加分类</Breadcrumb.Item>
				</Breadcrumb>
				<Form onSubmit={this.handleSubmit}>
					<FormItem
						{...formItemLayout}
						label="分类名称"
					>
						{getFieldDecorator('name', {
							rules: [{
								required: true, message: '请输入分类名称',
							}],
						})(
							<Input />

						)}
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="分类名称"
					>
						{getFieldDecorator('pid', {
							rules: [{
								required: true, message: '请选择分类',
							}],
						})(
							<Select initialValue="" style={{ width: 120 }}>
								<Option value="0">根分类</Option>
								{
									this.props.levelonecategories.map((category)=>{
										return <Option key={category.get('_id')} value={category.get('_id')}>根分类/{category.get('name')}</Option>
									})
								}
							</Select>
						)}
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

const CategoryAdd = Form.create()(NormalCategoryAdd);

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

export default connect(mapStateToProps,mapDispatchToProps)(CategoryAdd);