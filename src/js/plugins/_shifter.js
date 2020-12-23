import _trigger from '../core/_trigger';
function _updateWidth($this, opt) {
    var $scroller = $this.find('.shifter-list');
    var width = $this.width();
    var count = 1;
    for (var i = opt.length; i > 0; i--) {
        if (width > i * opt.size) {
            count = i + 1;
            break;
        }
    }
    count = Math.min(count, opt.length);
    $this[0].style.setProperty('--shifter-height', width * opt.ratio / count + 'px');
    _checkArraow($this);
    $scroller.attr('count', count);
    opt.width = width;
    opt.count = count;
}
function _checkArraow($this) {
    if (!$.isTouch) {
        return
    }
    var $scroller = $this.find('.shifter-list');
    var scrollLeft = $scroller.scrollLeft();
    var innerWidth = $scroller.innerWidth();
    var scrollWidth = $scroller.prop('scrollWidth');
    if ((scrollLeft + innerWidth) >= (scrollWidth - 100)) {
        $this.removeClass('hasNext');
    } else {
        $this.addClass('hasNext');
    }
    if (scrollLeft <= 100) {
        $this.removeClass('hasPrev');
    } else {
        $this.addClass('hasPrev');
    }
}
function _next($this, width, count) {
    if (!$this.hasClass('hasNext')) {
        return;
    }
    var $scroller = $this.find('.shifter-list');
    $scroller.addClass('moving');
    $scroller.stop().animate({
        scrollLeft: `+=${width / count}`
    }, {
        complete: function () { $scroller.removeClass('moving') },
        duration: 300
    });
}
function _prev($this, width, count) {
    if (!$this.hasClass('hasPrev')) {
        return;
    }
    var $scroller = $this.find('.shifter-list');
    $scroller.addClass('moving');
    $scroller.stop().animate({
        scrollLeft: `-=${width / count}`
    }, {
        complete: function () { $scroller.removeClass('moving') },
        duration: 300
    });
}
export default {
    name: 'shifter',
    defaultOpt: {
        size: 320,
        length: 5,
        ratio: 0.6
    },
    init: function ($this, opt, exportObj) {
        opt._id = $.guid++;
        _updateWidth($this, opt);
        exportObj.next = _next($this, opt.width, opt.count);
        exportObj.prev = _prev($this, opt.width, opt.count);
    },
    setOptionBefore: null,
    setOptionsAfter: null,
    initBefore: null,
    initAfter: function ($this, opt, exportObj) {
        var $scroller = $this.find('.shifter-list');
        if ($.isTouch) {
            var $prevLink = $('<a href="javascript:;" class="arrow prev"><i class="icon-angle-left"></i></a>');
            var $nextLink = $('<a href="javascript:;" class="arrow next"><i class="icon-angle-right"></i></a>');

            $prevLink.on('click', function () {
                exportObj.prev();
            });
            $nextLink.on('click', function () {
                exportObj.next();
            });
            $this.append($prevLink);
            $this.append($nextLink);
        }
        $(document).on('dom.resize.shifter' + opt._id, function () {
            _updateWidth($this, opt);
        });
        $scroller.on('scroll', $.throttle(function () {
            _checkArraow($this);
        }));
    },
    destroyBefore: function ($this, opt) {
        $(document).off('dom.resize.shifter' + opt._id);
    }
}
