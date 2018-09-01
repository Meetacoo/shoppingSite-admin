import React, { Component } from 'react';
import { Select } from 'antd';

import { request } from 'util';
import { GET_CATEGORIES } from 'api';

const Option = Select.Option;

class CategorySelector extends Component {
	constructor(props){
		super(props);
		this.state = {
			levelOneCategories: [],
			levelOneCategoryId: '',
			levelTwoCategories: [],
			levelTwoCategoryId: '',
			needLoadLevelTwo: false,
			isChanged:false
		}
		console.log(this.props.parentCategoryId);
		this.handleLevelOneChange = this.handleLevelOneChange.bind(this);
		this.handleLevelTwoChange = this.handleLevelTwoChange.bind(this);
	}
	componentDidMount(){
		this.LoadLevelOneCategories();
	}
	static getDerivedStateFromProps(props,state){
		console.log('props',props);
		console.log('state',state);

		const levelOneCategoryIdChanged = props.parentCategoryId !== state.levelOneCategoryId;
		const levelTwoCategoryIdChanged = props.categoryId !== state.levelTwoCategoryId;

		if (!levelOneCategoryIdChanged && !levelTwoCategoryIdChanged) {
			return null;
		}

		if (state.isChanged) {
			return null;
		}

		if (props.parentCategoryId == 0) {
			return {
				levelOneCategoryId:props.categoryId,
				levelTwoCategoryId:'',
				isChanged:true
			}
		} else {
			return {
				levelOneCategoryId:props.parentCategoryId,
				levelTwoCategoryId:props.categoryId,
				needLoadLevelTwo:true,
				isChanged:true
			}
		}
		return null;
	}
	componentDidUpdate(){
		if (this.state.needLoadLevelTwo) {
			this.LoadLevelTwoCategories();
		
			this.setState({
				needLoadLevelTwo:false
			})
		}
	}
	LoadLevelOneCategories(){
		request({
			method:'get',
			url: GET_CATEGORIES,
			data:{
				pid:0
			}
		})
		.then((result) => {
			console.log(result)
			if (result.code === 0) {
				this.setState({
					levelOneCategories:result.data
				})
			}
		})
	}
	handleLevelOneChange(value){
		this.setState ({
			levelOneCategoryId: value,
			levelTwoCategories: [],
			levelTwoCategoryId: '',
		},()=>{
			this.LoadLevelTwoCategories();
			this.onValueChange()
		})
	}
	handleLevelTwoChange(value){
		this.setState ({
			levelTwoCategoryId: value
		},()=>{
			this.onValueChange()
		})
	}
	LoadLevelTwoCategories(){
		request({
			method:'get',
			url: GET_CATEGORIES,
			data:{
				pid:this.state.levelOneCategoryId
			}
		})
		.then((result) => {
			console.log(result)
			if (result.code === 0) {
				this.setState({
					levelTwoCategories:result.data
				})
			}
		})
	}
	onValueChange(){
		const {levelOneCategoryId,levelTwoCategoryId} = this.state;
		
		//如果选择了二级分类
		if(levelTwoCategoryId){
			this.props.getCategoryId(levelOneCategoryId,levelTwoCategoryId)
		}else{
			this.props.getCategoryId(0,levelOneCategoryId)
		}
	}
	render(){
		const {levelOneCategories,levelOneCategoryId,levelTwoCategories,levelTwoCategoryId} = this.state;
		const levelOneOptions = levelOneCategories.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>);
		const levelTwoOptions = levelTwoCategories.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>);
		return(
			<div>
				<Select 
				style={{ width: 300 }} 
				defaultValue={levelOneCategoryId}
				value={levelOneCategoryId}
				onChange={(value)=>{this.handleLevelOneChange(value)}}>
					{levelOneOptions}
				</Select>
				{
					levelTwoOptions.length
					? <Select
						defaultValue={levelTwoCategoryId}
						value={levelTwoCategoryId}
						style={{ width: 300,marginLeft: 10 }} 
						onChange={this.handleLevelTwoChange}>
							{levelTwoOptions}
					</Select>
					: null
				}

			</div>
		)
	}
}

export default CategorySelector;