import inject from './inject';
import core from './core';
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

if(core.plugin.records && core.plugin.records.length){
    core.plugin.records.forEach(function(e){
        $(document).on('dom.load.datatable', function () {
            $('[data-datatable]').each(function () {
                var $this = $(this);
                var data = $this.data();
                $this.removeAttr('data-datatable');
                $this.datatable(data);
                $this.attr('data-datatable-load', '');
            });
        });

    })
}

$(document).on('dom.load', function () {
    $('[' + core.namespace + ']').each(function () {
        var $this = $(item);
        var data = $this.data();
        var types = $this.attr('cui');
        $this.removeAttr('cui');
        types.split('.').forEach(function (type) {
            var pluginName = core.namespace + type;
            $this[pluginName](data);
        });
        $this.attr('cui-load', types);
    });
});

$(document).ready(function () {
    $(document).trigger('cui.inital');
});

var cuiStatus = {};
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
_updateWindowStatus('inital');
//dom load
_isMobile();
_eventScrollListener();
_eventResizeListener();
$(document).one('cui.inital', function () {
    cuiStatus = {
        originalScrollTop: $(window).scrollTop(),
        isLandscape: $(window).width() > $(window).height(),
        scrollTop: $(window).scrollTop(),
        causeByKeyboard: false,
        isScrollDown: false,
        height: $(window).height(),
        width: $(window).width()
    };
    $(document).trigger('dom.load');
});
