import _ from 'lodash';
import _trigger from '../core/_trigger';
(function ($) {
    var animationDuration = 500;
    var tipConfig = {
        name: 'tip',
        defaultOpt: {
            height: 50,
            width: 320,
            type: '',
            placement: 'top',
            trigger: 'click',
            html: true,
            once: false,
            onload: null,
            showbefore: null,
            showafter: null,
            hidebefore: null,
            hideafter: null,
            _timer: null,
            parent: null
        },
        init: function ($this, opt, exportObj) {
            var $container = $('<div class="tooltip ' + opt.type + ' ' + opt.placement + '"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>');
            var $parent = opt.parent ? $(opt.parent) : $this;
            if ($parent.css('position') === 'static') {
                $parent.css('position', 'static');
            }
            $parent.append($container);
            $container.click(function (e) {
                e.stopPropagation();
            });
            exportObj.$container = $container;
            $container.hide();
            exportObj.show = function () {
                clearTimeout(opt._timer);
                opt.showbefore && _trigger(opt.showbefore, this);
                $container.find('.tooltip-inner')
                    .html(opt.content);
                var cWidth = $container.outerWidth();
                var cHeight = $container.outerHeight();
                var tWidth = $this.outerWidth();
                var tHeight = $this.outerHeight();
                var offset = $this.offset();
                var position = $this.position();
                var pWidth = $this.parent()
                    .outerWidth(true);
                var x = 0;
                var y = 0;
                var css = {};
                $container.show();
                setTimeout(function () {
                    $container.addClass('in');
                }, 10);
                switch (opt.placement) {
                    case 'top':
                    case 'bottom':
                        $container.removeClass('{0}-left {0}-right'.format(opt.placement));
                        x = (Math.abs(tWidth - cWidth) / 2);
                        if (x > offset.left) {
                            css = {
                                left: position.left,
                                right: ''
                            };
                            $container.addClass('{0}-right'.format(opt.placement));
                        } else if ((offset.left + (tWidth + cWidth) / 2) > $(window)
                            .width()) {
                            css = {
                                left: '',
                                right: pWidth - tWidth - position.left
                            };
                            $container.addClass('{0}-left'.format(opt.placement));
                        } else {
                            x = x - position.left;
                            css = {
                                left: -1 * x
                            };
                            $container.addClass(opt.placement);
                        }
                        $container.css(css);
                        break;
                    case 'left':
                    case 'right':
                        $container.removeClass(opt.placement);
                        if (opt.placement === 'left') {
                            x = cWidth * -1 + position.left - 5;
                        } else {
                            x = tWidth + position.left + 5;
                        }
                        y = (Math.abs(tHeight - cHeight) / 2);
                        css = {
                            top: -1 * y,
                            left: x,
                            right: ''
                        };
                        $container.css(css);
                        $container.addClass(opt.placement);
                        break;
                }
                if (opt.showafter) {
                    opt.showafter && _trigger(opt.showafter, this);
                }
            };
            exportObj.hide = function () {
                var that = this;
                opt.hidebefore && _trigger(opt.hidebefore, this);
                $container.removeClass('in');
                opt._timer = setTimeout(function () {
                    $container.hide();
                    opt.hideafter && _trigger(opt.hideafter, that);
                    if (opt.once) {
                        exportObj.destroy();
                    }
                }, animationDuration + 1);
            };
        },
        destroy: null,
        setOptionsBefore: null,
        setOptionsAfter: function ($this, opt, exportObj) {
            var $container = exportObj.$container;
            $container.find('.tooltip-inner')
                .html(opt.content);
        },
        initBefore: null,
        initAfter: function ($this, opt, exportObj) {
            switch (opt.trigger) {
                case 'click':
                    $this.on('click.' + exportObj.name, function () {
                        exportObj.show();
                        $(document)
                            .one('click', exportObj.hide);
                        return false;
                    });
                    break;
                case 'focus':
                    $this.on('focusin.' + exportObj.name, exportObj.show);
                    $this.on('focusout.' + exportObj.name, exportObj.hide);
                    break;
            }
            opt.onload && _trigger(opt.onload, this);
        },
        destroyBefore: function ($this, opt, exportObj) {
            var $this = $(this);
            $this.off('click.' + exportObj.name);
            $this.off('focusin.' + exportObj.name);
            $this.off('focusout.' + exportObj.name);
            exportObj.$container.remove();
        },
    };
    $.cui.plugin(tipConfig);
    $(document)
        .on('dom.load.tip', function () {
            $('[data-tip]')
                .each(function () {
                    var $this = $(this);
                    var options = $this.data();
                    $this.removeAttr('data-tip');
                    $this.tip(options);
                });
        });
})(jQuery);
