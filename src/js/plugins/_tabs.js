import _ from 'lodash';
import _trigger from '../core/_trigger';
(function ($) {
    var tabsConfig = {
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
                        //todo $(document).trigger('dom.load');
                    } else {
                        $target.hide();
                    }
                });
            };
            $items.each(function () {
                $(this).click(function () {
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
        destroyBefore: null
    };
    $.cui.plugin(tabsConfig);
    $(document).on('dom.load.tabs', function () {
        $('[data-tabs]').each(function (index, item) {
            var $this = $(item);
            var data = $this.data();
            $this.removeAttr('data-tabs');
            $this.tabs(data);
            $this.attr('data-tabs-load', '');
        });
    });
})(jQuery);
