import _ from 'lodash';
import _trigger from '../core/_trigger';
(function ($) {
    var headerConfig = {
        name: 'header',
        defaultOpt: {
            container: 'html',
            autoclose: true,
        },
        init: function ($this, opt, exportObj) {
            var $body = $('body');
            var $nav = $this.find('.header-nav');
            var $list = $this.find('.header-menu-list');
            var $dropdown = $list.find('.list');
            var $scrollLinkLeft = $('<a class="header-scroll-link left"><i class="icon-caret-left"></i></a>');
            var $scrollLinkRight = $('<a class="header-scroll-link right"><i class="icon-caret-right"></i></a>');
            var $overlay = $('<div class="header-overlay"></div>');
            var $swtichLink = $this.find('.header-switch-link');
            var $items = $list.children('li');
            var max = 0;
            var buffer = 5;
            $nav.append($scrollLinkLeft);
            $nav.append($scrollLinkRight);
            $this.prepend($overlay);
            var checkScrollable = function () {
                max = $list.prop('scrollWidth') - $list.outerWidth();
                if (max < buffer) {
                    $nav.removeClass('scrollable');
                } else {
                    $nav.addClass('scrollable');
                }
            };
            var checkScrollLink = function () {
                var scroll = $list.scrollLeft();
                if (scroll <= buffer) {
                    $scrollLinkLeft.removeClass('visable');
                    $scrollLinkRight.addClass('visable');
                } else if (scroll >= (max - buffer)) {
                    $scrollLinkLeft.addClass('visable');
                    $scrollLinkRight.removeClass('visable');
                } else {
                    $scrollLinkLeft.addClass('visable');
                    $scrollLinkRight.addClass('visable');
                }
            };
            //nav-list
            $list.on('scroll', _.throttle(checkScrollLink, 100));
            $(document).on('dom.resize', checkScrollable);
            checkScrollable();
            checkScrollLink();
            var _close = function () {
                $this.addClass('header-close');
            };
            var _open = function () {
                $this.removeClass('header-close');
            };
            var _show = function () {
                $body.addClass('expand');
            };
            var _hide = function () {
                $body.removeClass('expand');
            };
            $overlay.on('click', _hide);
            //nav
            $items.on('mouseenter touchstart', function () {
                $nav.toggleClass('active');
            });
            $items.on('mouseleave', function () {
                $nav.removeClass('active');
            });
            $dropdown.each(function () {
                var $arrow = $('<a src="javascript:;" class="header-expand"><i class="icon-caret-left"></i></a>');
                $arrow.on('click', function () {
                    var $li = $(this).closest('li');
                    var $prev = $li.siblings('.hover');
                    $prev.removeClass('hover');
                    $prev.css('height', '');
                    if ($li.hasClass('hover')) {
                        $li.removeClass('hover');
                        $li.css('height', '');
                    } else {
                        $li.addClass('hover');
                        $li.css('height', $li.prop('scrollHeight'));
                    }
                });
                $(this).append($arrow);
            });
            $swtichLink.on('click', function () {
                if ($body.hasClass('expand')) {
                    _hide();
                } else {
                    _show();
                }
            });
            $scrollLinkLeft.on('click', function () {
                $list.stop().animate({
                    scrollLeft: '-=100px'
                });
            });
            $scrollLinkRight.on('click', function () {
                $list.stop().animate({
                    scrollLeft: '+=100px'
                });
            });
            exportObj.show = _show;
            exportObj.hide = _hide;
            exportObj.close = _close;
            exportObj.open = _open;
            $(document).on('dom.resize', _hide);
            $(document).on('dom.scroll', function () {
                var status = $.cui.status;
                if (status.isScrollDown) {
                    _close();
                } else {
                    _open();
                }
            });
        },
        setOptionsBefore: null,
        setOptionsAfter: null,
        initBefore: null,
        initAfter: null,
        destroyBefore: null
    };
    $.cui.plugin(headerConfig);
    $(document).on('dom.load.header', function () {
        $('[data-header]').each(function (index, item) {
            var $this = $(item);
            var data = $this.data();
            $this.removeAttr('data-header');
            $this.header(data);
            $this.attr('data-header-load', '');
        });
    });
})(jQuery);

