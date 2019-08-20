import _trigger from '../core/_trigger';
export default {
    name: 'dialog',
    defaultOpt: {
        cache: false,
        autoclose: true,
        theme: 'default',
        target: null,
        trigger: null,
        renderbefore:null,
        renderafter:null,
        showbefore: null,
        showafter: null,
        hidebefore: null,
        hideafter: null,
    },
    initBefore: null,
    init: function ($this, opt, exportObj) {
        var $dialog;
        var $dialogPanel;
        var $dialogBody;
        var $dialogOverLay;
        var _reposition= exportObj.reposition =function(){
            var height = $dialog.height() - $dialogPanel.outerHeight();
            if (height > 0) {
                $dialogPanel.css({
                    marginTop: height / 2 + 'px'
                });
            } else {
                $dialogPanel.css({
                    marginTop: 0
                });
            }
        };
        var _show = exportObj.show = function () {
            if(!$dialog){
                _render();
            }
            $(document).trigger('dialog.hidden.except', [opt.id]);
            opt.showbefore && _trigger(opt.showbefore, $this, opt, exportObj);
            $('html').addClass('dialog-model');
            $dialog.show();
            setTimeout(function () {
                $dialog.addClass('dialog-active');
                _reposition();
                opt.showafter && _trigger(opt.showafter, $this, opt, exportObj);
            }, 50);
            $(document).on('dialog.hidden.except'+ opt.id, function (e, id) {
                if (id != opt.id) {
                    exportObj.hide();
                }
            });
            $(document).on('dom.resize.' + opt.id, function () {
                exportObj.reposition();
            });
        };
        var _hide = exportObj.hide = function () {
            if($dialog){
                opt.hidebefore && _trigger(opt.hidebefore, $this, opt, exportObj);
                $dialog.removeClass('dialog-active');
                setTimeout(function () {
                    $dialog.hide();
                    $('html').removeClass('dialog-model');
                    opt.hideafter && _trigger(opt.hidebefore, $this, opt, exportObj);
                    if(!opt.cache){
                        $dialog.remove();
                        $dialog = null;
                        $(document).off('dom.resize.' + opt.id, function () {
                            exportObj.reposition();
                        });
                        $(document).off('dialog.hidden.except'+ opt.id, function (e, id) {
                            if (id != opt.id) {
                                exportObj.hide();
                            }
                        });
                    }
                }, 500);
            }
        };
        var _render = exportObj.render = function(){
            $dialog = $(`<div class="dialog dialog-${opt.theme}" tabIndex="-1"></div>`);
            $dialogPanel = $('<div class="dialog-panel"></div>');
            $dialogBody = $('<div class="dialog-body"><a class="dialog-title-close" dialog-close href="javascript:void(0);"><i class="icon-remove"></i></a></div>');
            $dialogOverLay = $('<div class="dialog-overlay"></div>');
            $dialogPanel.append($dialogBody);
            $dialogBody.html('<a class="dialog-title-close" dialog-close href="javascript:void(0);"><i class="icon-remove"></i></a>');
            $dialogBody.append(opt.html);
            $dialog.append($dialogPanel);
            $dialog.prepend($dialogOverLay);
            $dialogBody.find('[dialog-close]').on('click', function () {
                _hide();
            });
            if(opt.autoclose){
                $dialogOverLay.click(function(){
                    _hide();
                });
            }
            $dialog.hide();
            $(document).trigger('dom.load');
            opt.renderbefore && _trigger(opt.renderbefore, $this, opt, exportObj);
            $('html').append($dialog);
            opt.renderafter && _trigger(opt.renderafter,$this, opt, exportObj);
        }
        $this.click(function () {
            var $this = $(this);
            var data = $this.data();
            var $target = $(data.target);
            if(!opt.id){
                opt.id =  'dialog'+ data.target;
            }
            opt.html = $target.html();
            data.trigger = $this;
            _show();
            return false;
        });
    },
    setOptionsBefore: null,
    setOptionsAfter: null,
    destroyBefore: null,
    initAfter: null,
};