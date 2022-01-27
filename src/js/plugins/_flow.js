import _trigger from '../core/_trigger';

export default {
	name: 'flow',
	defaultOpt: {
		items: [],
		source: null,
		target: null,
		container: null,
		template: '<img data-src="{{src}}" style="width:100%;" alt="{{alt}}">',
		breakpoint: [320, 640, 960, 1280],
		colCount: -1,
		onclick: null,
		reloadbefore: null,
		reloadafter: null,
	},
	init: function ($this, opt, exportObj) {
		var $container = opt.container ? $(opt.container) : $(window);
		var initalItems = function (items) {
			if (typeof items === 'string') {
				var data = window[items];
				switch (typeof data) {
					case 'function':
						return data();
					case 'object':
						return data;
					case 'string':
						return JSON.parse(data);
					default:
						return items;
				}
			} else if (items && items.length) {
				return items;
			}
			return;
		};
		var getItemHtml = function (template, data) {
			if (data && typeof data === 'string') {
				return data;
			}
			if (template) {
				if (typeof template === 'string') {
					var tmp = window[template];
					switch (typeof tmp) {
						case 'function':
							return tmp(data);
						case 'string':
							return $.renderHtml(tmp, data);
						default:
							return $.renderHtml(template, data);
					}
				} else if (typeof template === 'function') {
					return template(data);
				}
			}
			return;
		};
		var _getpositionInfo = function () {
			return {
				scrollTop: $container.scrollTop(),
				scrollBottom:
					$container.scrollTop() +
					Math.min($container.outerHeight(), window.innerHeight),
				offsetTop: $this.offset().top,
				offsetBottom: $this.offset().top + $this.height(),
			};
		};
		var positionInfo = _getpositionInfo();
		var _getColumnByBreakPoint = function (newBreakPoint) {
			opt.breakpoint = newBreakPoint || opt.breakpoint;
			var containerWidth = $this.width();
			if (opt.breakpoint && opt.breakpoint.length) {
				return opt.breakpoint.reduce(function (pre, next) {
					if (containerWidth > next) {
						return pre + 1;
					} else {
						return pre;
					}
				}, 1);
			}
			return 1;
		};
		var _getSmallestColumn = function (array) {
			return array.reduce(function (pre, next) {
				if (pre) {
					return pre.data('ratio') <= next.data('ratio') ? pre : next;
				} else {
					return next;
				}
			}, null);
		};
		var _createColumns = function (count) {
			var columns = [];
			var columnswidth = 100 / count + '%';
			while (count > 0) {
				var $ul = $('<ul></ul>').css({
					width: columnswidth,
				});
				$ul.data('ratio', 0);
				columns.push($ul);
				count--;
			}
			return columns;
		};
		var _createItemInColumns = function (item) {
			var html = getItemHtml(opt.template, item);
			var $tmp = $('<li>' + html + '</li>');
			if (opt.onclick) {
				$tmp.on('click', function () {
					_trigger(opt.onclick, $tmp, item);
				});
			}
			return $tmp;
		};
		var _loadImage = function () {
			$this.find('li').each(function (index, item) {
				var $item = $(item);
				var offsetTop = $item.offset().top;
				var offsetBottom = offsetTop + $item.outerHeight();
				if (
					offsetTop < positionInfo.scrollBottom &&
					offsetBottom > positionInfo.scrollTop
				) {
					var $img = $item.find('img');
					var src = $img.data('src');
					if (src) {
						$item.addClass('flow-loading');
						$img.on('load', function () {
							$item.removeClass('flow-loading');
							$item.addClass('flow-loaded');
						});
						$img.on('error', function () {
							$item.removeClass('flow-loading');
							$item.addClass('flow-error');
						});
						$img.attr('src', src);
					} else {
						$item.addClass('flow-loaded');
					}
				}
			});
		};
		var _moveByScroll = function (isScrollDown) {
			var verticalBottom = $this.hasClass('verticalBottom');
			var heightList = $this.find('> ul').map(function (index, item) {
				return $(item).outerHeight();
			});
			var needMove = false;
			var minHeight = $this.height() - Math.min.apply(this, heightList);
			if (isScrollDown) {
				minHeight = !verticalBottom ? minHeight : 0;
				if (
					positionInfo.scrollTop >
						positionInfo.offsetTop + minHeight &&
					positionInfo.scrollBottom < positionInfo.offsetBottom
				) {
					needMove = true;
				}
			} else {
				minHeight = verticalBottom ? minHeight : 0;
				if (
					positionInfo.scrollTop > positionInfo.offsetTop &&
					positionInfo.scrollBottom <
						positionInfo.offsetBottom - minHeight
				) {
					needMove = true;
				}
			}
			if (needMove) {
				if (isScrollDown) {
					$this.removeClass('scrollUP');
					var containerHeight = $this.height();
					$this.children('ul').each(function (index, item) {
						var $item = $(item);
						var offsetY = containerHeight - $item.height();
						$item.css('transform', 'translateY(' + offsetY + 'px)');
					});
					$this.addClass('verticalBottom');
				} else {
					$this.addClass('scrollUP');
					$this.children('ul').each(function (index, item) {
						var $item = $(item);
						$item.css('transform', 'translateY(' + 0 + ')');
					});
					$this.removeClass('verticalBottom');
				}
			}
		};
		var _render = function (data) {
			var ulList = _createColumns(opt.colCount);
			$.each(data, function (index, item) {
				var $li = _createItemInColumns(item);
				var $ul = _getSmallestColumn(ulList);
				$ul.append($li);
				if (item.height && item.width) {
					item.ratio = item.height / item.width;
				}
				var newRatio = $ul.data('ratio') + (item.ratio || 1);
				$ul.data('ratio', newRatio);
			});
			$this.addClass('flow');
			$this.empty();
			$.each(ulList, function (index, ul) {
				$this.append(ul);
			});
			_loadImage();
		};
		var _reload = (exportObj.reload = function (force) {
			if (force) {
				opt.colCount = -1;
			}
			var item = initalItems(opt.items);
			if (item && item.length) {
				var newColCount = _getColumnByBreakPoint();
				if (opt.colCount !== newColCount) {
					opt.colCount = newColCount;
					_render(item);
				}
			}
		});
		_reload(true);
		$container.on(
			'scroll',
			$.throttle(function () {
				var currentPositionInfo = _getpositionInfo();
				var isDown =
					positionInfo.scrollTop < currentPositionInfo.scrollTop;
				positionInfo = currentPositionInfo;
				_moveByScroll(isDown);
				_loadImage();
			}, 50)
		);
		window.addEventListener(
			'resize',
			function () {
				positionInfo = _getpositionInfo();
				_reload();
			},
			true
		);
	},

	setOptionsBefore: null,
	setOptionsAfter: null,
	initBefore: null,
	initAfter: null,
	destroyBefore: null,
	isThirdPart: true,
};
