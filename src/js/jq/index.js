const eventList = {};
const eventNames = ['click'];
const $ = {
	error(msg) {
		console.error(msg);
	},
	log(msg) {
		console.info(msg);
	},
	throttle(func, waitTime, options) {
		var context,
			args,
			result,
			wait = waitTime || 200;
		var timeout = null;
		var previous = 0;
		if (!options) {
			options = {};
		}
		var later = function () {
			previous = options.leading === false ? 0 : +new Date();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) {
				context = args = null;
			}
		};
		return function () {
			var now = +new Date();
			if (!previous && options.leading === false) {
				previous = now;
			}
			var remaining = wait - (now - previous);
			context = this;
			args = arguments;
			if (remaining <= 0 || remaining > wait) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				previous = now;
				result = func.apply(context, args);
				if (!timeout) {
					context = args = null;
				}
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining);
			}
			return result;
		};
	},
	debounce(func, waitTime, immediate) {
		var timeout,
			args,
			context,
			timestamp,
			result,
			wait = waitTime || 200;
		var later = function () {
			var last = +new Date() - timestamp;

			if (last < wait && last >= 0) {
				timeout = setTimeout(later, wait - last);
			} else {
				timeout = null;
				if (!immediate) {
					result = func.apply(context, args);
					if (!timeout) {
						context = args = null;
					}
				}
			}
		};
		return function () {
			context = this;
			args = arguments;
			timestamp = +new Date();
			var callNow = immediate && !timeout;
			if (!timeout) {
				timeout = setTimeout(later, wait);
			}
			if (callNow) {
				result = func.apply(context, args);
				context = args = null;
			}
			return result;
		};
	},
	queryToData(search) {
		let data = null;
		if (search && search.length) {
			data = {};
			search.split('&').forEach((k) => {
				if (k) {
					const ev = k.split('=');
					data[ev[0]] = decodeURIComponent(ev[1]);
				}
			});
		}
		return data;
	},
	dataToQuery(data) {
		let query = '';
		let arr = data ? Object.entries(data) : [];
		if (arr.length > 0) {
			query = Object.entries(data)
				.map(([key, value]) => {
					return `${key}=${encodeURIComponent(value)}`;
				})
				.join('&');
		}
		return query;
	},
	async ajax({ url, data = {}, headers, method }) {
		let query;
		if (method === 'GET') {
			query = Object.entries(data)
				.map(([key, value]) => {
					return `${key}=${value}`;
				})
				.join('&');
			if (query) {
				query = '?' + query;
			}
		}

		return fetch(`${url}${query}`, {
			method: method,
			headers: headers,
		})
			.then((res) => {
				this.log(res);
				return res;
			})
			.catch((err) => {
				this.log(err);
				throw new Error(err);
			});
	},
	select(selector, query) {
		if (query) {
			return selector.querySelectorAll(query);
		} else if (selector) {
			return document.querySelectorAll(selector);
		}
		return [];
	},
	id(id) {
		return document.getElementById(id);
	},
	on(str, cb, opts) {
		if (!cb || typeof cb !== 'function') {
			this.error('call back is not a function');
			return;
		}
		let events = str.split(' ');
		let options = opts || false;
		events = events.map((event) => {
			return event.split('.');
		});
		events.forEach((event) => {
			let [name, namespace] = event;
			namespace = namespace || 'DEFAULT';
			if (!eventList[name]) {
				eventList[name] = {};
			}
			if (!eventList[name][namespace]) {
				eventList[name][namespace] = [];
			}
			if (eventNames.indexOf(name) === -1) {
				eventList[name][namespace].push(cb);
			} else {
				window.addEventListener(name, cb, options);
			}
		});
	},
	off(str) {
		let events = str.split(' ');
		events = events.map((event) => {
			return event.split('.');
		});
		events.forEach((event) => {
			let [name, namespace] = event;
			namespace = namespace || 'DEFAULT';
			if (!eventList[name]) {
				return;
			}
			if (!eventList[name][namespace]) {
				return;
			}
			if (eventNames.indexOf(name) === -1) {
				delete eventList[name][namespace];
			} else {
				eventList[name][namespace].forEach((cb) => {
					window.removeEventListener(name, cb);
				});
			}
		});
	},
	emit(str, data) {
		let events = str.split(' ');
		events = events.map((event) => {
			return event.split('.');
		});
		events.forEach((event) => {
			let [name, namespace] = event;
			namespace = namespace || 'DEFAULT';
			if (!eventList[name]) {
				console.warn('event ' + name + ' is not exist');
				return;
			}
			if (namespace === 'DEFAULT') {
				for (key in eventList[name]) {
					eventList[name][key].forEach((cb) => {
						cb(data);
					});
				}
			} else if (!eventList[name][namespace]) {
				console.warn('event ' + event + ' is not exist');
			} else {
				eventList[name][namespace].forEach((cb) => {
					cb(data);
				});
			}
		});
	},
};

// script lib - event
