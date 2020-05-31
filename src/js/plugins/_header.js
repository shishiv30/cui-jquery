export default {
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
        var $overlay = $('<div class="header-overlay"></div>');
        var $swtichLink = $this.find('.header-switch-link');
       
        $this.prepend($overlay);
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
        exportObj.show = _show;
        exportObj.hide = _hide;
        exportObj.close = _close;
        exportObj.open = _open;
        $(document).on('dom.resize', _hide);
        $(document).on('dom.scroll', function () {
            var status = $.cui_state;
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
// $.cui.plugin(headerConfig);
// $(document).on('dom.load.header', function () {
//     $('[data-header]').each(function (index, item) {
//         var $this = $(item);
//         var data = $this.data();
//         $this.removeAttr('data-header');
//         $this.header(data);
//         $this.attr('data-header-load', '');
//     });
// });


