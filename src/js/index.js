import core from './core';
import inject from './inject';
import plugins from './plugins';
import $ from 'jquery';
window.$ = window.jQuery = $;
inject.forEach(e => {
    e.call(window, $);
});
for (var key in plugins) {
    var config = plugins[key];
    new core.plugin(config, $);
}
var cuiStatus = null;
var _isMobile = function () {
    var $body = $('body');
    if ($.isMobile()) {
        $body.addClass('mobile');
    } else {
        $body.addClass('desktop');
    }
};
var _isLandscap = function () {
    var $body = $('body');
    cuiStatus.width = $(window).width();
    cuiStatus.height = $(window).height();
    cuiStatus.isLandscape = cuiStatus.width > cuiStatus.height;
    if (cuiStatus.isLandscape) {
        $body.addClass('landscape');
        $body.removeClass('portrait');
    } else {
        $body.addClass('portrait');
        $body.removeClass('landscape');
    }
};
var _isScrollDown = function () {
    cuiStatus.scrollTop = $(window).scrollTop();
    if (cuiStatus.scrollTop > cuiStatus.originalScrollTop) {
        cuiStatus.isScrollDown = true;
    } else if (cuiStatus.scrollTop < cuiStatus.originalScrollTop) {
        cuiStatus.isScrollDown = false;
    }
    cuiStatus.originalScrollTop = cuiStatus.scrollTop;
};
var _updateWindowStatus = function (type) {
    if (!cuiStatus) {
        cuiStatus = {
            originalScrollTop: $(window).scrollTop(),
            isLandscape: $(window).width() > $(window).height(),
            scrollTop: $(window).scrollTop(),
            causeByKeyboard: false,
            isScrollDown: false,
            height: $(window).height(),
            width: $(window).width()
        };
    }
    cuiStatus.causeByKeyboard = $('input, select, textarea').is(':focus');
    switch (type) {
    case 'resize':
        _isScrollDown();
        _isLandscap();
        break;
    case 'scroll':
        _isScrollDown();
        break;
    case 'load':
        break;
    case 'inital':
        _isScrollDown();
        _isLandscap();
        break;
    default:
        break;
    }
    return status;
};
var _eventScrollListener = function () {
    $(window).on('scroll', _.throttle(function () {
        _updateWindowStatus('scroll');
        $(document).trigger('dom.scroll');
    }, 200));
};
var _eventResizeListener = function () {
    $(window).on('resize', _.debounce(function () {
        _updateWindowStatus('resize');
        $(document).trigger('dom.resize');
    }, 500));
};

$(document).one('cui.inital', function () {
    _updateWindowStatus('inital');
    //dom load
    _isMobile();
    _eventScrollListener();
    _eventResizeListener();
    $(document).trigger('dom.load');
});
$(document).on('dom.load', function () {
    var prefixed = 'data-'+core.plugin.namespace;
    $(`[${prefixed}]`).each(function (index, item) {
        var $this = $(item);
        var data = $this.data();
        var types = $this.attr(prefixed);
        $this.removeAttr(prefixed);
        $this.attr(`${prefixed}-load`, types);
        types.split('.').forEach(function (type) {
            var pluginName =core.plugin.namespace + '_' + type;
            $this[pluginName](data);
        });
    });
});
$(document).ready(function () {
    $(document).trigger('cui.inital');
});

export default $;