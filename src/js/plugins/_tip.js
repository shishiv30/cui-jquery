import _trigger from '../core/_trigger';
var animationDuration = 200;

function generateTip($parent, opt) {
	var $container = $(opt.template);
	$container.addClass(opt.theme);
	$container.addClass(opt.placement);
	$container.find('.tip-inner').html(opt.content);
	$parent.append($container);
	$container.on('click', function (e) {
		e.stopPropagation();
	});
	return $container;
}

export default {
	name: 'tip',
	defaultOpt: {
		theme: 'defalut',
		placement: 'top',
		trigger: 'click',
		html: true,
		once: false,
		onload: null,
		showbefore: null,
		showafter: null,
		hidebefore: null,
		hideafter: null,
		_timer: null,
		parent: null,
		template:
			'<div class="tip"><div class="tip-arrow"></div><div class="tip-inner"></div></div>',
	},
	init: function ($this, opt, exportObj) {
		exportObj.show = function () {
			if (!exportObj.$parent) {
				exportObj.$parent = opt.parent ? $(opt.parent) : $this.parent();
			}
			var $parent = exportObj.$parent;
			if ($parent.css('position') === 'static') {
				$parent.css('position', 'relative');
			}
			if (!exportObj.$container) {
				exportObj.$container = generateTip($parent, opt);
			}
			var $container = exportObj.$container;

			if (opt._timer) {
				clearTimeout(opt._timer);
			}
			opt.showbefore && _trigger(opt.showbefore, $this, opt, exportObj);
			var cWidth = $container.outerWidth();
			var cHeight = $container.outerHeight();
			var tWidth = $this.outerWidth();
			var tHeight = $this.outerHeight();
			var offset = $this.offset();
			var position = $this.position();
			var pWidth = $parent.outerWidth(true);
			var x = 0;
			var y = 0;
			var css = {};
			$container.show();
			setTimeout(function () {
				$container.addClass('in');
			}, 10);
			switch (opt.placement) {
				case 'top':
				case 'bottom':
					$container.removeClass(
						`${opt.placement}-left ${opt.placement}-right`
					);
					x = Math.abs(tWidth - cWidth) / 2;
					if (x > offset.left) {
						css = {
							left: position.left,
							right: '',
						};
						$container.addClass(`${opt.placement}-right`);
					} else if (
						offset.left + (tWidth + cWidth) / 2 >
						$(window).width()
					) {
						css = {
							left: '',
							right: pWidth - tWidth - position.left,
						};
						$container.addClass(`${opt.placement}-left`);
					} else {
						x = x - position.left / 2;
						css = {
							left: -1 * x,
						};
						$container.addClass(opt.placement);
					}
					$container.css(css);
					break;
				case 'left':
				case 'right':
					$container.removeClass(opt.placement);
					if (opt.placement === 'left') {
						x = cWidth * -1 + position.left - 5;
					} else {
						x = tWidth + position.left + 5;
					}
					y = Math.abs(tHeight - cHeight) / 2;
					css = {
						top: -1 * y,
						left: x,
						right: '',
					};
					$container.css(css);
					$container.addClass(opt.placement);
					break;
			}
			if (opt.showafter) {
				opt.showafter && _trigger(opt.showafter, $this, opt, exportObj);
			}
		};
		exportObj.hide = function () {
			var $container = exportObj.$container;
			var $parent = exportObj.$parent;
			$parent.css('position', '');
			opt.hidebefore && _trigger(opt.hidebefore, $this, opt, exportObj);
			$container.removeClass('in');
			opt._timer = setTimeout(function () {
				$container.hide();
				opt.hideafter && _trigger(opt.hideafter, $this, opt, exportObj);
				if (opt.once) {
					exportObj.destroy();
				}
			}, animationDuration + 1);
		};
	},
	setOptionsBefore: null,
	setOptionsAfter: function ($this, opt, exportObj) {
		var $container = exportObj.$container;
		$container.find('.tip-inner').html(opt.content);
	},
	initBefore: null,
	initAfter: function ($this, opt, exportObj) {
		switch (opt.trigger) {
			case 'click':
				$this.on('click.' + exportObj.name, function () {
					exportObj.show();
					$(document).one('click', exportObj.hide);
					return false;
				});
				break;
			case 'focus':
				$this.on('focusin.' + exportObj.name, exportObj.show);
				$this.on('focusout.' + exportObj.name, exportObj.hide);
				break;
		}
		opt.onload && _trigger(opt.onload, $this, opt, exportObj);
	},
	destroyBefore: function ($this, opt, exportObj) {
		$this.off('click.' + exportObj.name);
		$this.off('focusin.' + exportObj.name);
		$this.off('focusout.' + exportObj.name);
		exportObj.$container.remove();
	},
};
