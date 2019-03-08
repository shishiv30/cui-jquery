import _ from 'lodash';
import _trigger from '../core/_trigger';
export default {
    name: 'ranger',
    defaultOpt: {
        max: 100,
        min: 0,
        step: 0,
        decimals: 0,
        connect: null,
        orientation: 'horizontal',
        start: null,
        range: null,
        changebefore: null,
        changeafter: null,
    },
    init: function ($this, opt, exportObj) {
        var $input = $this.find('input');
        var $target = (opt.target ? $(opt.target) : null);
        if (!opt.connect) {
            opt.connect = [true];
            $input.each(function (index) {
                opt.connect.push((index % 2 === 1));
            });
        }
        if (!opt.start) {
            opt.start = [];
            $input.each(function () {
                opt.start.push($(this).val());
            });
        }
        var $ele = $('<div></div>');
        ($target || $this).append($ele);
        noUiSlider.create($ele[0], {
            start: opt.start,
            step: opt.step,
            connect: opt.connect,
            orientation: opt.orientation,
            range: opt.range || {
                'min': opt.min,
                'max': opt.max
            },
            format: {
                'to': function (value) {
                    return value !== undefined && value.toFixed(opt.decimals);
                },
                'from': function (value) {
                    return value;
                }
            }
        });
        exportObj.range = $ele[0].noUiSlider;
        exportObj.get = function () {
            return this.range.get();
        };
        exportObj.set = function (values) {
            this.range.set(values);
            var result = this.range.get();
            if ($.isNumeric(result)) {
                result = [result];
            }
            $input.each(function (index) {
                $(this).val(result[index]).trigger('input');
            });
            return result;
        };
        $input.on('change', function () {
            var values = [];
            $input.each(function () {
                values.push($(this).val());
            });
            exportObj.set(values);
        });
        exportObj.range.on('update', function (e, t) {
            opt.changebefore && _trigger(opt.changebefore, this, e, t);
            $input.each(function (index) {
                $(this).val(e[index]).trigger('input');
            });
            opt.changeafter && _trigger(opt.changeafter, this, e, t);
        });
    },
};
// $.cui.plugin(rangerConfig);
// $(document).on('dom.load.ranger', function () {
//     $('[data-ranger]').each(function (index, item) {
//         var $this = $(item);
//         var data = $this.data();
//         $this.removeAttr('data-ranger');
//         $this.ranger(data);
//         $this.attr('data-ranger-load', '');
//     });
// });

