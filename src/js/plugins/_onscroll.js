import _trigger from '../core/_trigger';
export default {
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
            var state = $.cui_state;
            if (opt.callback) {
                var scrolltop = state.scrollTop;
                var wheight = state.height;
                var offsetTop = $this.offset().top;
                if (offsetTop >= scrolltop && offsetTop <= (scrolltop + wheight + (force === true ? 0 : opt.reserve))) {
                    _trigger(opt.callback, $this, opt, exportObj);
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