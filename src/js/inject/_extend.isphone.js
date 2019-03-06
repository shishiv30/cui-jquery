export default function ($) {
    $ = $ || window.$;
    $.isPhone = function (str) {
        return /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(str);
    };
    return $;
}