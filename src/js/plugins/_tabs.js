import _trigger from '../core/_trigger';
export default {
	name: 'tabs',
	defaultOpt: {},
	init: function ($this, opt, exportObj) {
		var $items = $this.find('[data-tab]');
		var _switchActiveTab = function () {
			$items.each(function (index, item) {
				var $item = $(item);
				var $target = $($item.attr('data-target')).hide();
				if ($item.hasClass('active')) {
					$target.show();
					$(document).trigger('dom.load.tab');
				} else {
					$target.hide();
				}
			});
		};
		$items.each(function () {
			$(this).on('click', function () {
				$items.removeClass('active');
				$(this).addClass('active');
				_switchActiveTab();
			});
		});
		_switchActiveTab();
	},

	setOptionsBefore: null,
	setOptionsAfter: null,
	initBefore: null,
	initAfter: null,
	destroyBefore: null,
};
