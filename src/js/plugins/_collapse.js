import _ from 'lodash';
import _trigger from '../core/_trigger';
var collapseConfig = {
    name: 'Collapse',
    defaultOpt: {
        showtext: null,
        hidetext: null,
        once: false,
        isexpand: false,
        showbefore: null,
        showafter: null,
        hidebefore: null,
        hideafter: null,
        target: null
    },
    init: function ($this, opt, exportObj) {
        var $target = $(opt.target);
        //record the traget's height
        var height = 0;
        if ($target.offset() && $target.offset().top < $this.offset().top) {
            height = $target.height();
        }
        var _showtext = function () {
            if (opt.showtext) {
                if ($this.find('span').length > 0) {
                    $this.find('span').text(opt.showtext);
                } else {
                    $this.text(opt.showtext);
                }
            }
            if (opt.once) {
                $this.hide();
            }
        };
        var _hidetext = function () {
            if (opt.hidetext) {
                if ($this.find('span').length > 0) {
                    $this.find('span').text(opt.hidetext);
                } else {
                    $this.text(opt.hidetext);
                }
            }
        };
        if (opt.isexpand) {
            exportObj.show = function () {
                opt.showbefore && _trigger(opt.showbefore, this);
                $this.addClass('shown');
                $target.addClass('collapse-expand');
                _showtext();
                opt.showafter && _trigger(opt.showafter, this);
            };
            exportObj.hide = function () {
                opt.hidebefore && _trigger(opt.hidebefore, this);
                $this.removeClass('shown');
                $target.removeClass('collapse-expand');
                if (height && height > 0) {
                    $(window).scrollTop($(window).scrollTop() - $target.prop('scrollHeight') + height);
                }
                _hidetext();
                opt.hideafter && _trigger(opt.hideafter, this);
            };
        } else {
            exportObj.show = function () {
                opt.showbefore && _trigger(opt.showbefore, this);
                $this.addClass('shown');
                $target.show();
                _showtext();
                //todo $(document).trigger('dom.load');
                opt.showafter && _trigger(opt.showafter, this);
            };
            exportObj.hide = function () {
                opt.hidebefore && _trigger(opt.hidebefore, this);
                $this.removeClass('shown');
                $target.hide();
                if (height && height > 0) {
                    $(window).scrollTop($(window).scrollTop() - height);
                }
                _hidetext();
                opt.hideafter && _trigger(opt.hideafter, this);
            };
        }
    },
    setOptionsBefore: null,
    setOptionsAfter: null,
    initBefore: null,
    initAfter: function ($this, opt, exportObj) {
        var $target = $(opt.target);

        var _resetForExpand = function () {
            if (!$this.hasClass('shown')) {
                if ($target.prop('scrollHeight') > $target.prop('offsetHeight')) {
                    $this.css('visibility', 'visible');
                } else {
                    $this.css('visibility', 'hidden');
                }
            }
        };
        if (opt.isexpand) {
            $(document).on('dom.resize.collapse', _resetForExpand);
            _resetForExpand();
        }
        if (!opt.isexpand) {
            if ($target.is(':hidden')) {
                exportObj.hide();
            } else {
                exportObj.show();
            }
        }
        $this.on('click.collapse', exportObj.toggle);
    },
    destroyBefore: function ($this, opt, exportObj) {

        $this.off('click.collapse');
    }
};
export default collapseConfig;

