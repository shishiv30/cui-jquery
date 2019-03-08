import _ from 'lodash';
import _trigger from '../core/_trigger';
export default {
    name: 'imgzoom',
    defaultOpt: {
        step: 0,
        max: 200,
        min: 50,
        defaultzoom: 100,
        target: '',
        zoombefore: null,
        zoomafter: null
    },
    init: function ($this, opt, exportObj) {
        var $target = opt.target ? $(opt.target) : $this;
        exportObj.zoom = function (tmpStep) {
            var step = $.isNumeric(tmpStep) || opt.step;
            var currentzoom = $target.data('currentzoom');
            if (!currentzoom) {
                currentzoom = Math.floor($target.find('img').width() / $target.outerWidth() * 10) * 10;
            }
            var scrollTop = $target.scrollTop();
            var scrollTopRate = scrollTop / $target.prop('scrollHeight');
            if (step > 0) {
                currentzoom = Math.min(opt.max, (currentzoom + step));
            } else if (step < 0) {
                currentzoom = Math.max(opt.min, (currentzoom + step));
            } else if (step == 0) {
                currentzoom = opt.defaultzoom;
            }
            $target.data('currentzoom', currentzoom);
            $target.find('img').css({
                'width': currentzoom + '%'
            });
            if (scrollTop) {
                scrollTop = scrollTopRate * $target.prop('scrollHeight');
                $target.scrollTop(scrollTop);
            }
        };
        exportObj.getZoom = function () {
            return Math.floor($target.find('img').width() / $target.outerWidth() * 10) * 10;
        };
        exportObj.setZoom = function (step) {
            var opt = this.opt;
            opt.zoombefore && _trigger(opt.zoombefore, this);
            this._zoom(step);
            opt.zoomafter && _trigger(opt.zoomafter, this);
        };
    },
    setOptionsBefore: null,
    setOptionsAfter: null,
    initBefore: null,
    initAfter: function ($this, opt, exportObj) {
        exportObj.setZoom(0);
        $this.on('click.imgzoom', function () {
            exportObj.setZoom();
        });
    },
    destroyBefore: function ($this, opt, exportObj) {

        $this.off('click.imgzoom');
    }
};
// $.cui.plugin(imgzoomConfig);
// $(document).on('dom.load.imgzoom', function () {
//     $('[data-imgzoom]').each(function () {
//         var $this = $(this);
//         var data = $this.data();
//         $this.removeAttr('data-imgzoom');
//         $this.imgzoom(data);
//         $this.attr('data-imgzoom-load', '');
//     });
// });





































