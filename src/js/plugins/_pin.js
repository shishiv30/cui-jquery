import _trigger from '../core/_trigger';
export default {
    name: 'pin',
    defaultOpt: {
        top: 50,
        bottom: 0,
        target: ''
    },
    init: function ($this, opt, exportObj) {
        var $target = $(opt.target);
        $this.css('position', 'relative');
        $target.addClass('pin');
        var offsetTop = 0;
        var offsetBottom = 0;
        var reposition = function () {
            offsetTop = $this.offset().top - opt.top;
            offsetBottom = offsetTop + $this.height() - $target.height() - opt.bottom;
        };
        var _pin = function () {
            $target.css({
                position: 'fixed',
                'top': opt.top,
                bottom: 'auto'
            });
        };
        var _unpin = function (isTop) {
            if (isTop) {
                $target.css({
                    position: 'absolute',
                    top: 0,
                    bottom: 'auto'
                });
            } else {
                $target.css({
                    position: 'absolute',
                    top: 'auto',
                    bottom: 0
                });
            }
        };
        var _setpin = function (scrollTop, isReposition) {
            if (isReposition) {
                reposition();
            }
            if (scrollTop < offsetTop) {
                _unpin(true);
            } else {
                if (scrollTop > offsetBottom) {
                    _unpin(false);
                } else {
                    _pin();
                }
            }
        };
        exportObj.pin = _pin;
        exportObj.unpin = _unpin;
        exportObj.setpin = _setpin;
        window.addEventListener('scroll', function () {
            var scrollTop = $(window).scrollTop();
            _setpin(scrollTop, false);
        }, true);
        $(document).on('dom.resize', function () {
            _setpin($.cui.scrollTop, true);
        });
    },
    setOptionsBefore: null,
    setOptionsAfter: null,
    initBefore: null,
    initAfter: null,
    destroyBefore: null
};
