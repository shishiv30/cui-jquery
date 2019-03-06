export default function ($) {
    $ = $ || window.$;
    $.isInt = function (str) {
        return /^-?\d+$/.test(str);
    };
    return $;
}