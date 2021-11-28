import _trigger from '../core/_trigger';
function loadImg(img) {
	var $img = $(img);
	var imgSrc = $img.attr('data-src');
	if (imgSrc) {
		$.loadImg($img, imgSrc);
	}
	$img.removeAttr('data-src');
}

function _updateWidth($this, $scroller, opt) {
	var width = $this.width();
	var count = 1;
	for (var i = opt.length; i > 0; i--) {
		if (width > i * opt.size) {
			count = i + 1;
			break;
		}
	}
	count = Math.min(count, opt.length);
	$this[0].style.setProperty(
		'--carousel-height',
		(width * opt.ratio) / count + 'px'
	);
	_checkArraow($this, $scroller);
	$scroller.attr('count', count);
	opt.width = width;
	opt.count = count;
}
function _checkArraow($this, $scroller) {
	if ($.isTouch) {
		return;
	}
	var scrollLeft = $scroller.scrollLeft();
	var innerWidth = $scroller.innerWidth();
	var scrollWidth = $scroller.prop('scrollWidth');
	if (scrollLeft + innerWidth >= scrollWidth - 100) {
		$this.removeClass('hasNext');
	} else {
		$this.addClass('hasNext');
	}
	if (scrollLeft <= 100) {
		$this.removeClass('hasPrev');
	} else {
		$this.addClass('hasPrev');
	}
}
function _getOffset($el, next) {
	var offset = 0;
	$el.each(function (index, item) {
		var $this = $(item);
		var left = $this.offset().left;
		if (next) {
			if (left >= 0) {
				offset = $this.outerWidth(true);
				return false;
			}
		} else {
			var width = $this.outerWidth(true);
			if (left + width >= 0) {
				offset = width;
				return false;
			}
		}
	});
	return offset;
}

export default {
	name: 'carousel',
	defaultOpt: {
		size: 320,
		length: 5,
		ratio: 0.6,
	},
	init: function ($this, opt, exportObj) {
		var $scroller = $this.find('[data-role*="scrollbar"]');
		exportObj.$scroller = $scroller;
		opt._id = $.guid++;
		if (opt.size !== 'auto') {
			_updateWidth($this, $scroller, opt);
		} else {
			_checkArraow($this, $scroller);
		}
		exportObj.next = function () {
			var width = opt.width;
			var count = opt.count;
			if (!$this.hasClass('hasNext')) {
				return;
			}
			var offset;
			if (count) {
				offset = count - 1 ? (width * (count - 1)) / count : width;
			} else {
				offset = _getOffset($scroller.children(), true);
			}
			var left = $scroller.scrollLeft();
			$scroller.stop().animate(
				{
					scrollLeft: left + offset,
				},
				150
			);
		};
		exportObj.prev = function () {
			var width = opt.width;
			var count = opt.count;
			if (!$this.hasClass('hasPrev')) {
				return;
			}
			var offset;
			if (count) {
				offset = count - 1 ? (width * (count - 1)) / count : width;
			} else {
				offset = this.getOffset($scroller.children(), false);
			}
			var left = $scroller.scrollLeft();
			$scroller.stop().animate(
				{
					scrollLeft: left - offset,
				},
				150
			);
		};
	},
	setOptionBefore: null,
	setOptionsAfter: null,
	initBefore: null,
	initAfter: function ($this, opt, exportObj) {
		var $scroller = exportObj.$scroller;
		if (!$.isTouch) {
			var $prevLink = $(
				'<a href="javascript:;" class="arrow prev"><i class="icon-angle-left"></i></a>'
			);
			var $nextLink = $(
				'<a href="javascript:;" class="arrow next"><i class="icon-angle-right"></i></a>'
			);

			$prevLink.on('click', exportObj.prev);
			$nextLink.on('click', exportObj.next);
			$this.append($prevLink);
			$this.append($nextLink);
		}

		$(document).on('dom.resize.carousel' + opt._id, function () {
			if (opt.size !== 'auto') {
				_updateWidth($this, $scroller, opt);
			} else {
				_checkArraow($this, $scroller);
			}
		});
		$scroller.on(
			'scroll',
			$.throttle(function () {
				_checkArraow($this, $scroller);
			}, 500)
		);
	},
	destroyBefore: function ($this, opt) {
		$(document).off('dom.resize.carousel' + opt._id);
	},
};
