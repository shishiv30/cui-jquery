export default {
	name: 'header',
	defaultOpt: {
		container: 'html',
		autoclose: true,
	},
	init: function ($this, opt, exportObj) {
		var $body = $('body');
		var $list = $this.find('.header-menu-list');
		var $dropdown = $list.find('.list');
		var $overlay = $('<div class="header-overlay"></div>');
		var $swtichLink = $this.find('.header-switch-link');
		opt.id = $.guid++;
		$this.prepend($overlay);
		var _close = function () {
			$this.addClass('header-close');
		};
		var _open = function () {
			$this.removeClass('header-close');
		};
		var _show = function () {
			$body.addClass('body-expand-header');
		};
		var _hide = function () {
			$body.removeClass('body-expand-header');
			$list.find('li').removeClass('hover').css('height', '');
		};
		$overlay.on('click', _hide);
		//nav
		$dropdown.each(function () {
			var $arrow = $(
				'<a href="javascript:;" class="header-expand"><i class="icon-caret-left"></i></a>'
			);
			$arrow.on('click', function () {
				var $li = $(this).closest('li');
				var $prev = $li.siblings('.hover');
				$prev.removeClass('hover');
				$prev.css('height', '');
				if ($li.hasClass('hover')) {
					$li.removeClass('hover');
					$li.css('height', '');
				} else {
					$li.addClass('hover');
					$li.css('height', $li.prop('scrollHeight'));
				}
			});
			$(this).append($arrow);
		});
		$swtichLink.on('click', function () {
			if ($body.hasClass('body-expand-header')) {
				_hide();
			} else {
				_show();
			}
		});
		exportObj.show = _show;
		exportObj.hide = _hide;
		exportObj.close = _close;
		exportObj.open = _open;
		$(document).on('dom.resize.header' + opt.id, _hide);
		$(document).on('dom.scroll.header' + opt.id, function () {
			var status = $.cui_state;
			if (status.isScrollDown && status.scrollTop > 500) {
				_close();
			} else {
				_open();
			}
		});
	},
	setOptionsBefore: null,
	setOptionsAfter: null,
	initBefore: null,
	initAfter: null,
	destroyBefore: function ($this, opt) {
		$(document).off('dom.resize.header' + opt.id);
		$(document).off('dom.scroll.header' + opt.id);
	},
};
