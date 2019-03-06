import _ from 'lodash';
import _trigger from '../core/_trigger';
(function ($) {
    var transitionConfig = {
        name: 'transition',
        defaultOpt: {
            type: 'number',
            from: 0,
            to: 0,
            frame: 25,
            time: 1,
            fixed: 0,
            dateformat: 'MMMM Do YYYY'
        },
        init: function ($this, opt, exportObj) {


            var start = null;
            var end = null;
            var step = null;
            var duration = null;
            var times = null;
            var format = null;
            var isIncrease = null;
            var _freshNumber = exportObj.freshNumber = function () {
                start = opt.from * 1;
                end = opt.to * 1;
                duration = Math.floor(1000 / opt.frame);
                times = opt.time * 1000 / duration;
                step = ((end - start) / times);
                isIncrease = step > 0;
            };
            var _freshDate = exportObj.freshDate = function () {
                start = +new Date(opt.from);
                end = +new Date(opt.to);
                duration = 1000 / opt.frame;
                times = opt.time * 1000 / duration;
                step = ((end - start) / times);
                isIncrease = step > 0;
            };
            var _fresh = exportObj.fresh = function () {
                opt.freshbefore && _trigger(opt.freshbefore, this);
                switch (opt.type) {
                    case 'number':
                        _freshNumber();
                        format = function (rawNumber) {
                            return rawNumber.toFixed(opt.fixed);
                        };
                        break;
                    case 'date':
                        _freshDate();
                        format = function (rawNumber) {
                            var rawDate = new Date(rawNumber);
                            return rawDate.format(opt.dateformat);
                        };
                        break;
                }
                var interval = setInterval(function () {
                    var rawNumber = isIncrease ? Math.min(start, end) : Math.max(start, end);
                    $this.text(format(rawNumber));
                    if (isIncrease ? (rawNumber >= end) : (rawNumber <= end)) {
                        clearInterval(interval);
                    } else {
                        start = rawNumber + step;
                    }
                }, duration);
                opt.freshafter && _trigger(opt.freshafter, this);
            };
            _fresh();
        },
        setOptionsBefore: null,
        setOptionsAfter: null,
        initBefore: null,
        initAfter: function ($this, opt, exportObj) {



            if (!opt.once) {
                $(document).on('dom.load.transition', function () {
                    if ($this.attr('data-to') != opt.to) {
                        opt.to = $this.attr('data-to');
                        exportObj.fresh();
                    }
                });
            }
        },
        destroyBefore: null,
    };
    $.cui.plugin(transitionConfig);
    $(document).on('dom.load.transition', function () {
        $('[data-transition]').each(function (index, item) {
            var $this = $(item);
            var data = $this.data();
            $this.removeAttr('data-transition');
            $this.onscroll({
                once: true,
                callback: function () {
                    $this.transition(data);
                    $this.attr('data-transition-load', '');
                }
            });
        });
    });
})(jQuery);
