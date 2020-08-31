import _trigger from '../core/_trigger';
export default {
    name: 'collapse',
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
                opt.showbefore && _trigger(opt.showbefore, $this, opt, exportObj);
                $this.addClass('shown');
                $target.addClass('collapse-expand');
                _showtext();
                $(document).trigger('dom.load.image');
                opt.showafter && _trigger(opt.showafter, $this, opt, exportObj);
            };
            exportObj.hide = function () {
                opt.hidebefore && _trigger(opt.hidebefore, $this, opt, exportObj);
                $this.removeClass('shown');
                $target.removeClass('collapse-expand');
                _hidetext();
                $(document).trigger('dom.load');
                opt.hideafter && _trigger(opt.hideafter, $this, opt, exportObj);
            };
        } else {
            exportObj.show = function () {
                opt.showbefore && _trigger(opt.showbefore, $this, opt, exportObj);
                $this.addClass('shown');
                $target.show();
                _showtext();
                $(document).trigger('dom.load');
                opt.showafter && _trigger(opt.showafter, $this, opt, exportObj);
            };
            exportObj.hide = function () {
                opt.hidebefore && _trigger(opt.hidebefore, $this, opt, exportObj);
                $this.removeClass('shown');
                $target.hide();
                _hidetext();
                $(document).trigger('dom.load');
                opt.hideafter && _trigger(opt.hideafter, $this, opt, exportObj);
            };
        }
        exportObj.toggle =  function () {
            if ($this.hasClass('shown')) {
                exportObj.hide();
            } else {
                exportObj.show();
            }
        }
    },
    setOptionsBefore: null,
    setOptionsAfter: null,
    initBefore: null,
    initAfter: function ($this, opt, exportObj) {
        var $target = $(opt.target);

        var _resetForExpand = function () {
            if (!$this.hasClass('shown')) {
                if ($target.prop('loadHeight') > $target.prop('offsetHeight')) {
                    $this.css('visibility', 'visible');
                } else {
                    $this.css('visibility', 'hidden');
                }
            }
        };
        if (opt.isexpand) {
            $(document).on('dom.resize.collapse', _resetForExpand);
            _resetForExpand();
        } else {
            if ($target.is(':hidden')) {
                exportObj.hide();
            } else {
                exportObj.show();
            }
        }
        $this.on('click.collapse', exportObj.toggle);
    },
    destroyBefore: function ($this) {
        $this.off('click.collapse');
    }
};

