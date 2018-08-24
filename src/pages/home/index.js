import React, { Component } from 'react';
import { getUserName } from 'util';

// import store from './store';

class App extends Component {
	render() {
		return (
			
				<div className="box">
					
					{ getUserName() }
				</div>
		);
	}
}

export default App;