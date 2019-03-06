import inject from './inject';
import core from './core';
import collapse from './plugins/_collapse';
import $ from 'jquery';

window.$ = window.jQuery = $;
inject.forEach(e => {
    e.call(window, $);
});

new core.plugin(collapse, $);
// for (key in plugins) {
//     var item = plugins[key];
//     $.cui.register(item);
// }
// $(document).on('dom.load', function () {
//     $('[cui]').each(function () {
//         var $this = $(item);
//         var data = $this.data();
//         var types = $this.attr('cui');
//         $this.removeAttr('cui');
//         types.split('.').forEach(function (type) {
//             $this[type](data);
//         });
//         $this.attr('cui-load', types);
//     });
// });
// $.cui.plugins


// $(document).on('dom.load.collapse', function () {
//     $('[data-collapse]').each(function (index, item) {
//         var $this = $(item);
//         var data = $this.data();
//         $this.removeAttr('data-collapse');
//         $this.collapse(data);
//         $this.attr('data-collapse-load', '');
//     });
// });



// (function ($) {
//     $(document).ready(function () {
//         $(document).trigger('cui.inital');
//     });
// })(jQuery);



// $.cui.status = {};
// var _isMobile = function () {
//     var $body = $('body');
//     if ($.isMobile()) {
//         $body.addClass('mobile');
//     } else {
//         $body.addClass('desktop');
//     }
// };
// var _isLandscap = function () {
//     var $body = $('body');
//     $.cui.status.width = $(window).width();
//     $.cui.status.height = $(window).height();
//     $.cui.status.isLandscape = $.cui.status.width > $.cui.status.height;
//     if ($.cui.status.isLandscape) {
//         $body.addClass('landscape');
//         $body.removeClass('portrait');
//     } else {
//         $body.addClass('portrait');
//         $body.removeClass('landscape');
//     }
// };
// var _isScrollDown = function () {
//     $.cui.status.scrollTop = $(window).scrollTop();
//     if ($.cui.status.scrollTop > $.cui.status.originalScrollTop) {
//         $.cui.status.isScrollDown = true;
//     } else if ($.cui.status.scrollTop < $.cui.status.originalScrollTop) {
//         $.cui.status.isScrollDown = false;
//     }
//     $.cui.status.originalScrollTop = $.cui.status.scrollTop;
// };
// var _updateWindowStatus = function (type) {
//     $.cui.status.causeByKeyboard = $('input, select, textarea').is(':focus');
//     switch (type) {
//         case 'resize':
//             _isScrollDown();
//             _isLandscap();
//             break;
//         case 'scroll':
//             _isScrollDown();
//             break;
//         case 'load':
//             break;
//         case 'inital':
//             _isScrollDown();
//             _isLandscap();
//             break;
//         default:
//             break;
//     }
//     return status;
// };
// var _eventScrollListener = function () {
//     $(window).on('scroll', _.throttle(function () {
//         _updateWindowStatus('scroll');
//         $(document).trigger('dom.scroll');
//     }, 200));
// };
// var _eventResizeListener = function () {
//     $(window).on('resize', _.debounce(function () {
//         _updateWindowStatus('resize');
//         $(document).trigger('dom.resize');
//     }, 500));
// };
// _updateWindowStatus('inital');
// //dom load
// _isMobile();
// _eventScrollListener();
// _eventResizeListener();
// $(document).one('cui.inital', function () {
//     $.cui.status = {
//         originalScrollTop: $(window).scrollTop(),
//         isLandscape: $(window).width() > $(window).height(),
//         scrollTop: $(window).scrollTop(),
//         causeByKeyboard: false,
//         isScrollDown: false,
//         height: $(window).height(),
//         width: $(window).width()
//     };
//     $(document).trigger('dom.load');
// });
