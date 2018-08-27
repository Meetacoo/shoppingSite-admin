import React, { Component } from 'react';
import { Form, Input, Select, Button } from 'antd';
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
	handleSubmit(e) {
		e.preventDefault();
		this.setState({
			isCateFatching:true
		})
		this.props.form.validateFields((err, values) => {
			
			if (!err) {
				console.log('Received values of form: ', values);
			}
		});
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		return(
			<MyLayout>
				<Form onSubmit={this.handleSubmit}>
					<FormItem
						label="分类名称"
					>
					{getFieldDecorator('category', {
						rules: [{
							required: true, message: '请输入分类名称',
						}],
					})(
						<Input />

					)}
					</FormItem>
					<FormItem
						label="分类名称"
					>
					{getFieldDecorator('pid', {
						rules: [{
							required: true, message: '请选择分类',
						}],
					})(
						<Select initialValue="lucy" style={{ width: 120 }}>
							<Option value="0">根分类</Option>
							<Option value="1">一级分类</Option>
						</Select>
					)}
					</FormItem>
					<FormItem>
						<Button type="primary" htmlType="submit">Register</Button>
					</FormItem>
				</Form>
			</MyLayout>
		)
	}
}

const CategoryAdd = Form.create()(NormalCategoryAdd);

const mapStateToProps = (state)=>{
	return {
		isFatching:state.get('login').get('isFatching')
	}
}

const mapDispatchToProps = (dispatch)=>{
	return {
		handleLogin:(values)=>{
			const action = actionCreator.getLoginAction(values);
			dispatch(action)
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryAdd);