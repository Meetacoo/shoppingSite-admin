import React, { Component } from 'react';
import { Switch,Route } from 'react-router-dom';

import OrderList from './list.js';
import OrderDetail from './detail.js';

class Order extends Component {
	render(){
		return(
			<Switch>
				<Route path="/order/detail/:orderNo" component={ OrderDetail }></Route>
				<Route path="/order/" component={ OrderList }></Route>
			</Switch>
		)
	}
}

export default Order;