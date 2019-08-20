import $ from 'jquery';
export default function (name) {
    var params = Array.prototype.slice.call(arguments);
    params = params.slice(1, params.length);
    if ($.isFunction(name)) {
        name.apply(this, params);
    } else {
        $(document).trigger(name, params);
    }
}