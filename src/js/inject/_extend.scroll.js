export default function ($) {
	$.scrollParentY = function ($this) {
		var scrollParent = $this.parents().filter(function () {
			var parent = $(this);
			return (
				parent.prop('scrollHeight') > parent.prop('clientHeight') &&
				parent.css('overflowY') !== 'hidden'
			);
		});
		if (scrollParent.length > 0) {
			return scrollParent.is('body, html') ? null : scrollParent.eq(0);
		}
		return null;
	};
	$.scrollParentX = function ($this) {
		var scrollParent = $this.parents().filter(function () {
			var parent = $(this);
			return (
				parent.prop('scrollWidth') > parent.prop('clientWidth') &&
				parent.prop('scrollWidth') > $this.prop('scrollWidth') &&
				parent.css('overflowX') !== 'hidden'
			);
		});
		if (scrollParent.length > 0) {
			return scrollParent.is('body, html') ? null : scrollParent.eq(0);
		}
		return null;
	};
	var _scroll = function ($target, position, $scroll) {
		if (position === 'center') {
			$target[0].scrollIntoView({ block: 'center' });
		} else {
			var offset = 300;
			if (position > 0) {
				offset = position * 1;
			}
			$target[0].scrollIntoView(true);
			if ($scroll) {
				$scroll[0].scrollTop -= offset;
			} else {
				window.scrollBy(0, offset * -1);
			}
		}
	};
	$.scrollTo = function (el, position) {
		var $panel = $(el);
		if ($panel.length > 0) {
			var $scroll = $.scrollParentY($panel);
			_scroll($panel, position, $scroll);
		}
	};
	return $;
}
