import _ from 'lodash';
import _trigger from '../core/_trigger';
export default {
    name: 'measurement',
    defaultOpt: {
        data: [{
            marker: '<div class="pin">A</div>',
            value: 100,
        }, {
            marker: '<div class="pin">B</div>',
            value: 500,
        },
        {
            marker: '<div class="pin">C</div>',
            value: 450,
        }],
        min: null,
        max: null,
        onclick: null
    },
    init: function ($this, opt, exportObj) {


        var _render = function () {
            var $container = $('<div class="measurement"><div class="measurement-line"></div></div></div>');
            $.each(opt.data, function (index, item) {
                if (opt.min > item.value) {
                    opt.min = item.value;
                }
                if (opt.max < item.value) {
                    opt.max = item.value;
                }
            });
            var total = opt.max - opt.min;
            $.each(opt.data, function (index, item) {
                var position = (item.value - opt.min) / total * 100;
                var $item = $('<div class="measurement-item">' + item.marker + '</div>');
                $item.css({
                    left: position + '%'
                });
                if (opt.onclick) {
                    opt.onclick && _trigger(opt.onclick, context, $item);
                }
                $container.append($item);
            });
            var $min = $('<div class="measurement-min">' + opt.min + '</div>');
            $container.append($min);
            var $max = $('<div class="measurement-max">' + opt.max + '</div>');
            $container.append($max);
            return $container;
        };
        $this.append(_render());

    },

    setOptionsBefore: null,
    setOptionsAfter: null,
    initBefore: null,
    initAfter: null,
    destroyBefore: null
};
// $.cui.plugin(measurementConfig);
// $(document).on('dom.load.measurement', function () {
//     $('[data-measurement]').each(function (index, item) {
//         var $this = $(item);
//         var data = $this.data();
//         $this.removeAttr('data-measurement');
//         $this.measurement(data);
//         $this.attr('data-measurement-load', '');
//     });
// });

