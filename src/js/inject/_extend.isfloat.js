export default function ($) {
    $ = $ || window.$;
    $.isFloat = function (str) {
        return /^([-]){0,1}([0-9]){1,}([.]){0,1}([0-9]){0,}$/.test(str);
    };
    return $;
}