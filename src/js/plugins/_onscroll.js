import _ from 'lodash';
import _trigger from '../core/_trigger';
(function ($) {
    var onscrollConfig = {
        name: 'onscroll',
        defaultOpt: {
            callback: null,
            params: null,
            reserve: 0,
            once: true
        },
        init: function ($this, opt, exportObj) {


            var eventName = 'dom.scroll.' + $.guid++;
            var _checkScreen = function (force) {
                var status = $.cui.status;
                if (opt.callback) {
                    var scrolltop = status.scrollTop;
                    var wheight = status.height;
                    var offsetTop = $this.offset().top;
                    if (offsetTop >= scrolltop && offsetTop <= (scrolltop + wheight + (force === true ? 0 : opt.reserve))) {
                        _trigger(opt.callback, [opt.params]);
                        if (opt.once) {
                            opt.callback = null;
                            $(document).off(eventName);
                        }
                    }
                }
            };
            $(document).on(eventName, function () {
                _checkScreen();
            });
            _checkScreen(true);
        },

        setOptionsBefore: null,
        setOptionsAfter: null,
        initBefore: null,
        initAfter: null,
        destroyBefore: null
    };
    $.cui.plugin(onscrollConfig);
    $(document).on('dom.load.onscroll', function () {
        $('[data-onscroll]').each(function (index, item) {
            var $this = $(item);
            var data = $this.data();
            $this.removeAttr('data-onscroll');
            $this.onscroll(data);
            $this.attr('data-onscroll-load', '');
        });
    });
})(jQuery);
