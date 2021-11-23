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

function updateTip($this, opt, exportObj) {
	if (!exportObj.$parent) {
		exportObj.$parent = opt.parent ? $(opt.parent) : $this;
	}
	var $parent = exportObj.$parent;
	if (!exportObj.$container) {
		exportObj.$container = generateTip($parent, opt);
	}
	var $container = exportObj.$container;
	$container.find('.tip-inner').html(opt.content);
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
			updateTip($this, opt, exportObj);
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
			var wWidth = $(window).width();
			var x = 0;
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
							left: 0,
							right: '',
						};
						$container.addClass(`${opt.placement}-left`);
					} else if (offset.left + tWidth + x > wWidth) {
						css = {
							left: '',
							right: 0,
						};
						$container.addClass(`${opt.placement}-right`);
					} else {
						css = {
							left: (tWidth - cWidth) / 2,
							right: '',
						};
						$container.addClass(opt.placement);
					}
					$container.css(css);
					break;
				case 'left':
				case 'right':
					$container.removeClass(opt.placement);
					if (opt.placement === 'left') {
						x = cWidth * -1;
					} else {
						x = tWidth;
					}
					css = {
						top: (tHeight - cHeight) / 2,
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
			if (!exportObj.$container) return;
			updateTip($this, opt, exportObj);
			exportObj.$parent.css('position', '');
			opt.hidebefore && _trigger(opt.hidebefore, $this, opt, exportObj);
			exportObj.$container.removeClass('in');
			opt._timer = setTimeout(function () {
				exportObj.$container.hide();
				opt.hideafter && _trigger(opt.hideafter, $this, opt, exportObj);
				if (opt.once) {
					exportObj.$container.remove();
					exportObj.$container = null;
				}
			}, animationDuration + 1);
		};
	},
	setOptionsBefore: null,
	setOptionsAfter: function ($this, opt, exportObj) {},
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
