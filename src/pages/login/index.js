import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import { actionCreator } from './store'
import './index.css';
const FormItem = Form.Item;


class Login extends Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);

	}
	handleSubmit(e) {
	e.preventDefault();
	this.props.form.validateFields((err, values) => {
		if (!err) {
			// console.log('Received values of form: ', values);
			axios({
				method: 'post',
				url: '/http://127.0.0.1:3000/admin/login',
				data: values
			})
			.then(function (result) {
				console.log(result);
			})
			.catch(function (err) {
				console.log(err);
			});
		}
	});
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<div className="Login">
				<Form onSubmit={this.handleSubmit} className="login-form">
					<FormItem>
						{getFieldDecorator('username', {
							rules: [{ required: true, message: '请输入用户名!' },{pattern:/^[a-zA-Z0-9_-]{4,16}$/,message:'4到16位（字母，数字，下划线，减号）'}],
						})(
							<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />} placeholder="用户名" />
						)}
					</FormItem>
					<FormItem>
						{getFieldDecorator('password', {
							rules: [{ required: true, message: '请输入密码!' },{pattern:/^[a-zA-Z0-9_-]{4,16}$/,message:'4到16位（字母，数字，下划线，减号）'}],
						})(
							<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
						)}
					</FormItem>
					<FormItem>
						<Button type="primary" onClick={this.handleSubmit} className="login-form-button" loading={false}>
							登录
						</Button>
					</FormItem>
				</Form>
			</div>
		);
	}
	
}
const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm;