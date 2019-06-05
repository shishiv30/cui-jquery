import _ from 'lodash';
import _trigger from '../core/_trigger';
export default {
    name: 'picker',
    defaultOpt: {
        picktype: null
    },
    initBefore: null,
    init: function ($this, opt, exportObj) {
        var setting = {
            todayBtn: true,
            autoclose: true,
            todayHighlight: true,
            viewSelect: 4,
        };
        switch ( opt.picktype) {
        case 'date':
            _.assignIn(setting, {
                format: 'yyyy-mm-dd',
                startView: 2,
                minView: 2,
                maxView: 4
            });
            break;
        case 'time':
            _.assignIn(setting, {
                showMeridian: true,
                format: 'hh:ii',
                startView: 1,
                minView: 0,
                maxView: 1,
                keyboardNavigation: false
            });
            break;
        default:
            _.assignIn(setting, {
                format: 'yyyy-mm-dd hh:ii',
            });
            break;
        }
        $this.datetimepicker(setting);
        exportObj.original = function () {
            return $this.data('datetimepicker');
        }
    },
    isThirdPart: true,
    setOptionsBefore: null,
    setOptionsAfter: null,
    destroyBefore: null,
    initAfter: null,
};
// $.cui.plugin(pickerContext);
// $(document).on('focus', '[data-picker]', function () {
//     var $this = $(this);
//     var opt = $this.data();
//     $this.removeAttr('data-picker');
//     $this.picker(opt);
//     $this.attr('data-picker-load', '');
// });

