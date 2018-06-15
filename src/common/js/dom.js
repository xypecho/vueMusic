export function getData(element, name, val){
	const prefix = 'data-';
	name = prefix + name;
	if (val) {
		return element.setAttribute(name, val);
	}else{
		return element.getAttribute(name);
	}
}