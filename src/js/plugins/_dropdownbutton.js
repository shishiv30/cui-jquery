import _ from 'lodash';
import _trigger from '../core/_trigger';
export default {
    name: 'dropdownbutton',
    defaultOpt: {},
    init: function ($this, opt, exportObj) {
        var $link = $this.children('a').eq(0);
        var $icon = $this.children('a').eq(1);
        var $list = $this.find('.dropdown-button-list');
        $this.on('click', function (e) {
            e.stopPropagation();
        });
        exportObj.select = function ($item) {
            if ($item.closest('.dropdown-button-list').length > 0) {
                $link.appendTo($list);
                $item.prependTo($this);
                $link = $item;
                $(document).trigger('click.dropdownbutton');
            }
        };
        exportObj.close = function () {
            $list.hide();
        };
        exportObj.open = function () {
            if ($list.is(':hidden')) {
                $list.show();
                $(document).one('click.dropdownbutton', exportObj.close);
            }
        };
        $icon.on('click', exportObj.open);
        $list.find('a').on('click', function () {
            exportObj.select($(this));
        });
        $link.on('click', function () {
            exportObj.select($(this));
        });
    },
    setOptionsBefore: null,
    setOptionsAfter: null,
    initBefore: null,
    initAfter: null,
    destroyBefore: null
};
// $.cui.plugin(dropdownbuttonConfig);
// $(document).on('dom.load.dropdownbutton', function () {
//     $('[data-dropdownbutton]').each(function (index, item) {
//         var $this = $(item);
//         var data = $this.data();
//         $this.removeAttr('data-dropdownbutton');
//         $this.dropdownbutton(data);
//         $this.attr('data-dropdownbutton-load', '');
//     });
// });

