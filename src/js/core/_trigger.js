export default function (name) {
	var params = Array.prototype.slice.call(arguments);
	params = params.slice(1, params.length);
	if (typeof name === 'function') {
		name.apply(this, params);
	} else if (typeof name === 'string') {
		if (typeof window[name] === 'function') {
			window[name].apply(this, params);
		} else {
			$(document).trigger(name, params);
		}
	}
}
