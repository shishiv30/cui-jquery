import jQuery from 'jquery';
(function ($) {
    var textboxConfig = {
        name: 'textbox',
        defaultOpt: {},
        init: function (context) {
            var $this = context.$element;
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
        exports: null,
        setOptionsBefore: null,
        setOptionsAfter: null,
        initBefore: null,
        initAfter: null,
        destroyBefore: null,
    };
    $.CUI.plugin(textboxConfig);
    $(document).on('dom.load.textbox', function () {
        $('[data-textbox]').each(function (index, item) {
            var $this = $(item);
            var data = $this.data();
            $this.removeAttr('data-textbox');
            $this.textbox(data);
            $this.attr('data-textbox-load', '');
        });
    });
})(jQuery);
