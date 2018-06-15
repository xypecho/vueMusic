export function shuffle(arr) {
	let _arr = arr.slice();
	for (var i = 0; i < _arr.length; i++) {
		let temp = getRandom(0, i);
		let temp_arr = _arr[i];
		_arr[i] = _arr[temp];
		_arr[temp] = temp_arr;
	}
	return _arr;
} //打乱数组
function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}