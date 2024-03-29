import _trigger from '../core/_trigger';
export default {
	name: 'textbox',
	defaultOpt: {},
	init: function ($this, opt, exportObj) {
		var $input = $this.find('input');
		var _switchLabel = function () {
			if ($input.val()) {
				$this.addClass('focus');
			} else {
				$this.removeClass('focus');
			}
		};
		if (!$input.length) {
			$input = $this.find('textarea');
		}
		$input.on('focusin', function () {
			$this.addClass('focus');
		});
		$input.on('focusout', function () {
			if (!$input.val()) {
				$this.removeClass('focus');
			}
		});
		$input.on('change', _switchLabel);
		_switchLabel();
	},
	setOptionsBefore: null,
	setOptionsAfter: null,
	initBefore: null,
	initAfter: null,
	destroyBefore: null,
};
