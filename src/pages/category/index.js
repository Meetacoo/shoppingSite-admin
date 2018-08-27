import React, { Component } from 'react';
import { Switch,Route } from 'react-router-dom';

import CategoryList from './list.js';
import CategoryAdd from './add.js';

class Category extends Component {
	render(){
		return(
			<Switch>
				<Route path="/category/add" component={ CategoryAdd }></Route>
				<Route path="/category" component={ CategoryList }></Route>
			</Switch>
		)
	}
}

export default Category;