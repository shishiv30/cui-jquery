import _trigger from '../core/_trigger';
export default {
    name: 'locker',
    defaultOpt: {
        onbeforelock: null,
        onafterlock: null,
        onbeforeunlock: null,
        onafterunlock: null
    },
    init: function ($this, opt, exportObj) {
        exportObj.lock = function () {
            opt.onbeforelock && _trigger(opt.onbeforelock, $this, opt, exportObj);
            $this.addClass('locked');
            opt.onafterlock && _trigger(opt.onafterlock, $this, opt, exportObj);
        };
        exportObj.unlock = function () {
            opt.onbeforeunlock && _trigger(opt.onbeforeunlock, $this, opt, exportObj);
            $this.removeClass('locked');
            opt.onafterunlock && _trigger(opt.onafterunlock, $this, opt, exportObj);
        };
    },
    setOptionsBefore: null,
    setOptionsAfter: null,
    initBefore: null,
    initAfter: function ($this, opt, exportObj) {

        exportObj.lock();
    },
    destroyBefore: null
};
// $.cui.plugin(lockerConfig);
// $(document).on('dom.load.locker', function () {
//     $('[data-locker]').each(function (index, item) {
//         var $this = $(item);
//         var data = $this.data();
//         $this.removeAttr('data-locker');
//         $this.locker(data);
//         $this.attr('data-locker-load', '');
//     });
// });

