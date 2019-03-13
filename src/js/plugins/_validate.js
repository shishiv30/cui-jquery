import _ from 'lodash';
import _trigger from '../core/_trigger';
var customValidate = {
    max: function ($element) {
        var value = $element.val();
        var max = $element.attr('data-max');
        var a = $.isNumeric(value) ? value : Date.parse(value);
        var b = $.isNumeric(max) ? max : Date.parse(max);
        return (a - b) <= 0;
    },
    less: function ($element) {
        var value = $element.val();
        var less = $element.attr('data-less');
        var a = $.isNumeric(value) ? value : Date.parse(value);
        var b = $.isNumeric(less) ? less : Date.parse(less);
        return (a - b) < 0;
    },
    min: function ($element) {
        var value = $element.val();
        var min = $element.attr('data-min');
        var a = $.isNumeric(value) ? value : Date.parse(value);
        var b = $.isNumeric(min) ? min : Date.parse(min);
        return (a - b) >= 0;
    },
    greater: function ($element) {
        var value = $element.val();
        var greater = $element.attr('data-greater');
        var a = $.isNumeric(value) ? value : Date.parse(value);
        var b = $.isNumeric(greater) ? greater : Date.parse(greater);
        return (a - b) > 0;
    }
};
var _showValidate = function ($element, message) {
    $element.closest('.input').removeClass('has-success');
    $element.closest('.input').addClass('has-error');
    if (message) {
        $element.tip({
            once: true,
            type: 'error',
            content: message,
            placement: 'bottom',
            trigger: null
        }).show();
    }
};
var _passValidate = function ($element, isRequried) {
    $element.closest('.input').removeClass('has-error');
    if ($element.data('tip')) {
        $element.data('tip').hide();
    }
    if ($element.is('[id]')) {
        $('[for=' + $element.attr('id') + ']').removeClass('error-text');
    }
    if (isRequried) {
        $element.closest('.input').addClass('has-success');
    } else if ($element.val()) {
        $element.closest('.input').addClass('has-success');
    } else {
        $element.closest('.input').removeClass('has-success');
    }
};
var _validate = function ($element, type, errorText, addition) {
    var value = $.trim($element.val());
    var isRequired = type.indexOf('required') >= 0;
    var message = '';
    for (var i = 0; i < type.length; i++) {
        switch (type[i]) {
        case 'required':
            if (!value && value === '') {
                message = 'This is requried';
                _showValidate($element, message);
                return false;
            }
            break;
        case 'email':
            if (value && !$.isEmail(value)) {
                message = errorText || 'Please enter a valid email.';
                _showValidate($element, message);
                return false;
            }
            break;
        case 'phone':
            if (value && !$.isPhone(value)) {
                message = errorText || 'Please enter a valid Phone Number';
                _showValidate($element, message);
                return false;
            }
            break;
        case 'zipcode':
            if (value && !$.isZipcode(value)) {
                message = errorText || 'Please enter a valid zipcode';
                _showValidate($element, message);
                return false;
            }
            break;
        case 'price':
            if (value && !$.isPrice(value)) {
                message = errorText || 'Please enter a valid price';
                _showValidate($element, message);
                return false;
            }
            break;
        case 'int':
            if (value && !$.isInt(value)) {
                message = errorText || 'Only allowed integer number';
                _showValidate($element, message);
                return false;
            }
            break;
        case 'float':
            if (value && !$.isFloat(value)) {
                message = errorText || 'Only allowed floating number';
                _showValidate($element, message);
                return false;
            }
            break;
        default:
            break;
        }
    }

    if (customValidate[addition] && !customValidate[addition]($element)) {
        _showValidate($element, message);
        return false;
    }

    _passValidate($element, isRequired);
    return true;
};
export default {
    name: 'validate',
    defaultOpt: {
        errortext: 'Invalid value.',
        addition: null
    },
    initBefore: null,
    init: function ($this, opt, exportObj) {
        opt.validate = opt.validate ? opt.validate.split(',') : [];
        $this.on('change.validate', function () {
            _validate($this, opt.validate, opt.errortext, opt.addition);
        });
        exportObj.isValid = function () {
            return _validate($this, opt.validate, opt.errortext, opt.addition);
        }
    },
    setOptionsBefore: function (e, context, options) {
        options.validate = options.validate ? options.validate.split(',') : [];
    },
    setOptionsAfter: function ($this, opt, exportObj) {
        $this.off('change.validate').on('change.validate', function () {
            _validate($this, opt.validate, opt.errortext, opt.addition);
        });
    },
    destroyBefore: function ($this, opt, exportObj) {

        $this.off('change.validate');
    },
    initAfter: null,
};
// $.cui.plugin(validateConfig);
// $(document).on('dom.load.validate', function () {
//     $('[data-validate]').each(function () {
//         var $this = $(this);
//         var option = $this.data();
//         $this.removeAttr('data-validate');
//         $this.validate(option);
//         $this.attr('data-validate-load', '');
//     });
// });
