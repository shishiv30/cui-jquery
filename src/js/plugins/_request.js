import _ from 'lodash';
import _trigger from '../core/_trigger';
export default {
    name: 'request',
    defaultOpt: {
        target: '',
        type: null,
        beforesend: null,
        onsuccess: null,
        onerror: null,
        datatype: null,
        lock: 1,
    },
    init: function ($this, opt, exportObj) {
        var $target = $(opt.target);
        var send = function () {
            var params = {
                type: opt.type,
                dataType: opt.datatype,
                lock: opt.lock
            };
            if ($target) {
                if ($target.isValid()) {
                    params.data = $target.getValue();
                } else {
                    return false;
                }
            }
            params.beforeSend = function () {
                if (_.isFunction(opt.beforesend)) {
                    opt.beforesend(opt);
                } else {
                    $(document).trigger(opt.beforesend, [opt]);
                }
            };
            params.success = function () {
                if (_.isFunction(opt.onsuccess)) {
                    opt.onsuccess(opt);
                } else {
                    $(document).trigger(opt.onsuccess, [$this, opt]);
                }
            };
            params.error = function () {
                if (_.isFunction(opt.onerror)) {
                    opt.onerror(opt);
                } else {
                    $(document).trigger(opt.onerror, [$this, opt]);
                }
            };
            $.ajax(params);
        };
        $this.click(send);
    },
    setOptionsBefore: null,
    setOptionsAfter: null,
    initBefore: null,
    initAfter: null,
    destroyBefore: null
};
// $.cui.plugin(requestConfig);
// $(document).on('dom.load.request', function () {
//     $('[data-request]').each(function (index, item) {
//         var $this = $(item);
//         var data = $this.data();
//         $this.removeAttr('data-request');
//         $this.request(data);
//         $this.attr('data-request-load', '');
//     });
// });

