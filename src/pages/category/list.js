import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import MyLayout from 'common/layout';

class CategoryList extends Component {
	render(){
		return(
			<div>
				<MyLayout>
					<Link to="/category/add" >add!!!</Link>
				</MyLayout>
			</div>
		)
	}
}

export default CategoryList;