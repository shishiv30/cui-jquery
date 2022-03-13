import _trigger from '../core/_trigger';
const defaultSrc =
	'data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw==';
const name = 'lazyload';
function loadImg(img) {
	var $img = $(img);
	var imgSrc = $img.attr('data-src');
	if (!imgSrc) {
		return false;
	}
	$img.removeAttr('data-src');
	$.loadImg($img, imgSrc);
	return true;
}

function load(el) {
	var loadbefore = $(el).data(name).getOptions()['loadbefore'];
	loadbefore && _trigger(loadbefore);
	if (el.nodeName === 'IMG') {
		return loadImg(el);
	}
}

function createObserver(el) {
	if (!window.observer) {
		const options = {
			rootMargin: '50% 50% 50% 50%',
			threshold: 0,
		};
		window.observer = new IntersectionObserver(handler, options);
	}
	window.observer.observe(el);
}

function handler(entries) {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) {
			return;
		}
		if (load(entry.target)) {
			window.observer.unobserve(entry.target);
		}
	});
}

export default {
	name: name,
	defaultOpt: {
		loadbefore: null,
	},
	init: function ($this) {
		$this.each(function () {
			createObserver(this);
		});
	},
	setOptionsBefore: null,
	setOptionsAfter: null,
	initBefore: function ($this) {
		var src = $this.attr('src');
		if (src !== defaultSrc) {
			$this.attr('src', defaultSrc);
			$this.attr('data-src', src);
		}
	},
	initAfter: null,
	destroyBefore: function ($this) {
		window.observer && window.observer.unobserve($this[0]);
	},
};
