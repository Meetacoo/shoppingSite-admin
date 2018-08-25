import axios from 'axios';

export const request = (options)=>{
	return new Promise((resolve,reject)=>{
		axios({
			method: options.method || 'get',
			url: options.url || '',
			data: options.data || null,
			withCredentials: true
		})
		.then(result => {
			let data = result.data;
			if (data.code === 0) { 
				removeUserName();
				window.location.href = '/login';
				resolve(data)
			} else if (data.code === 1) {
				// message.error(data.message);
				window.location.href = '/login';
				reject(data.message);
			}
		})
		.catch(err => {
			// console.log(err);
			reject(err);
		})
	})
}

export const setUserName = (username)=>{
	window.localStorage.setItem('username',username)
}

export const getUserName = ()=>{
	return window.localStorage.getItem('username')
}

export const removeUserName = ()=>{
	window.localStorage.removeItem('username')
}