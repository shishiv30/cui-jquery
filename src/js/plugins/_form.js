//validate for form submit
import _ from 'lodash';
import _trigger from '../core/_trigger';
export default {
    name: 'form',
    defaultOpt: null,
    initBefore: null,
    init: function ($this, opt, exportObj) {
        exportObj.isValid = function () {
            var foucsElement = null;
            var isPassed = true;
            $this.find('[data-validate-load]').each(function (index, item) {
                var isValide = $(item).data('validate').isValid();
                if (!isValide) {
                    isPassed = false;
                    if (!foucsElement) {
                        foucsElement = $(item);
                    }
                    return false;
                }
            });
            if (foucsElement) {
                foucsElement.focus();
            }
            return isPassed;
        };
        exportObj.getValue = function () {
            var obj = {};
            $this.find(':text').each(function (index, item) {
                var name = $(item).attr('name');
                if (name) {
                    obj[name] = $(item).val();
                }
            });
            $this.find(':password').each(function (index, item) {
                var name = $(item).attr('name');
                if (name) {
                    obj[name] = $(item).val();
                }
            });
            $this.find(':hidden').each(function (index, item) {
                var name = $(item).attr('name');
                if (name) {
                    obj[name] = $(item).val();
                }
            });
            $this.find('textarea').each(function (index, item) {
                var name = $(item).attr('name');
                if (name) {
                    obj[name] = $(item).val();
                }
            });
            $this.find('select').each(function (index, item) {
                var name = $(item).attr('name');
                if (name) {
                    obj[name] = $(item).val();
                }
            });
            $this.find('.checkbox').each(function (index, item) {
                var name;
                var checkbox;
                var checkboxList;
                if ($(item).data('type') == 'single') {
                    checkbox = $(item).find(':checkbox').eq(0);
                    if (checkbox.length) {

                        name = checkbox.attr('name');
                        if (checkbox.is(':checked')) {
                            obj[name] = checkbox.attr('value') ? checkbox.attr('value') : true;
                        } else {
                            obj[name] = checkbox.attr('value') ? '' : false;
                        }
                    }
                } else {
                    checkboxList = $(item).find(':checkbox:checked');
                    name = checkboxList.attr('name');
                    if (name) {
                        obj[name] = $.map(checkboxList, function (item) {
                            return $(item).val();
                        });
                    }
                }
            });
            $this.find('.radio').each(function (index, item) {
                var radioItem = $(item).find(':radio:checked');
                var name = radioItem.attr('name');
                if (name) {
                    obj[name] = $(radioItem).val();
                }
            });
            return obj;
        };
        return exportObj;
    },
    setOptionsBefore: null,
    setOptionsAfter: null,
    destroyBefore: null,
    initAfter: null,
};
// $.cui.plugin(formConfig);
// $(document).on('dom.load', function () {
//     $('[data-form]').each(function (index, item) {
//         var $this = $(item);
//         var data = $this.data();
//         $this.removeAttr('data-form');
//         $this.form(data);
//         $this.attr('data-form-load', '');
//     });
// });

