import scss from '../scss/cui.scss';

window.$ = window.jQuery = jQuery;
import './libs';
import core from './core';
import inject from './inject';
import plugins from './plugins';
var state = {};
var _isMobile = function () {
	var $body = $('body');
	if ($.isMobile) {
		$body.addClass('mobile');
	} else {
		$body.addClass('desktop');
	}
};
var _isLandscap = function () {
	var $body = $('body');
	state.width = $(window).width();
	state.height = $(window).height();
	state.isLandscape = state.width > state.height;
	if (state.isLandscape) {
		$body.addClass('landscape');
		$body.removeClass('portrait');
	} else {
		$body.addClass('portrait');
		$body.removeClass('landscape');
	}
};
var _isScrollDown = function () {
	state.scrollTop = $(window).scrollTop();
	if (state.scrollTop > state.originalScrollTop) {
		state.isScrollDown = true;
	} else if (state.scrollTop < state.originalScrollTop) {
		state.isScrollDown = false;
	}
	state.originalScrollTop = state.scrollTop;
};
var _updateWindowStatus = function (type) {
	if (!state) {
		state = {
			originalScrollTop: $(window).scrollTop(),
			isLandscape: $(window).width() > $(window).height(),
			scrollTop: $(window).scrollTop(),
			causeByKeyboard: false,
			isScrollDown: false,
			height: $(window).height(),
			width: $(window).width(),
		};
	}
	state.causeByKeyboard = $('input, select, textarea').is(':focus');
	switch (type) {
		case 'resize':
			_isScrollDown();
			_isLandscap();
			break;
		case 'scroll':
			_isScrollDown();
			break;
		case 'load':
			break;
		case 'inital':
			_isScrollDown();
			_isLandscap();
			$.cui_state = state;
			break;
		default:
			break;
	}
	return state;
};
var _eventScrollListener = function () {
	$(window).on(
		'scroll',
		$.throttle(function () {
			_updateWindowStatus('scroll');
			$(document).trigger('dom.scroll');
		}, 200)
	);
};
var _eventResizeListener = function () {
	$(window).on(
		'resize',
		$.debounce(function () {
			_updateWindowStatus('resize');
			$(document).trigger('dom.resize');
		}, 500)
	);
};
//there is only one thing jQuery say to Death
var notToday = function () {
	inject($);
	for (var key in plugins) {
		var config = plugins[key];
		new core.plugin(config, $);
	}
	$(document).one('cui.inital', function () {
		_updateWindowStatus('inital');
		//dom load
		_isMobile();
		_eventScrollListener();
		_eventResizeListener();
		$(document).trigger('dom.load');
	});
	$(document).on('dom.load', function () {
		// the interface wil be follow ARIA which is nice for more accessibility
		$('[role]').each(function (index, item) {
			var $this = $(item);
			if ($this.is('[loaded]')) {
				return;
			}

			var data = $this.data();
			var types = $this.attr('role');
			if (!types) {
				return;
			}
			$this.attr('loaded', true);
			types = types.trim(' ').split(/\s+/g);

			types.forEach((type) => {
				var pluginName = core.plugin.namespace + '_' + type;
				$this[pluginName] && $this[pluginName](data);
			});
		});
	});
	//entry point
	$(function () {
		$(document).trigger('cui.inital');
	});
};

//there is only one thing jQuery say to Death
notToday();
