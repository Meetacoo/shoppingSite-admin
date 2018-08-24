import React, { Component } from 'react';
// import axios from 'axios';
import { connect } from 'react-redux';
import { actionCreator } from './store'
import { Form, Icon, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
const FormItem = Form.Item;


class NormalLoginForm extends Component {
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			isFatching:false
		}
	}
	handleSubmit(e) {
	e.preventDefault();
	this.setState({
		isFatching:true
	})
	this.props.form.validateFields((err, values) => {
		
		if (!err) {
			// console.log('Received values of form: ', values);
		/*	
			axios({
				method: 'post',
				url: 'http://127.0.0.1:8060/admin/login',
				data: values
			})
			.then(function (result) {
				
				// console.log(result);
				let data = result.data;
				if (data.code == 0) {
					window.location.href = '/';
					self.setState({
						isFatching:false
					})
				} else if (data.code == 10) {
					message.error(data.message);
					self.setState({
					isFatching:false
				})

				}
				
			})
			.catch(function (err) {
				// message.error("网络错误，请稍后")
				console.log(err);
			});
		*/
			this.props.handleLogin(values)
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
						<Button 
							type="primary" 
							onClick={this.handleSubmit} 
							className="login-form-button" 
							// loading={this.props.isFatching}
							loading={this.props.isFatching}
						>
							登录
						</Button>
					</FormItem>
				</Form>
			</div>
		);
	}
	
}
// const WrappedNormalLoginForm = Form.create()(Login);
const Login = Form.create()(NormalLoginForm);

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

// export default WrappedNormalLoginForm;
export default connect(mapStateToProps,mapDispatchToProps)(Login);