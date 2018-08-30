import React, { Component } from 'react';
import { Link } from 'react-router-dom';



import MyLayout from 'common/layout';


class ProductList extends Component {
	render(){
		return(
			<MyLayout>
				<Link to='/product/save'>save</Link>
			</MyLayout>
		)
	}
}

// export default User;
export default ProductList;