import originJsonp from 'jsonp';

export default function jsonp(url,data,option){
	return new Promise((resolve,reject)=>{
		originJsonp(url,option,(err,data)){
			if (!err) {
				resolve(data);
			} else {
				reject(err);
			}
		}
	})
}

function param(data){
	let url='';
	for(let key in data){
		let value=data[key]==undefined?'':data[key];
		url+=`&${key}=${encodeURIComponent(value)}`;
	}
	return url?url.substring(1):'';//如果url后面有参数则把
}