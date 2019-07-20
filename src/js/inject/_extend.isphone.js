export default function ($) {
    $ = $ || window.$;
    $.isPhone = function (str) {
        return /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/.test(str);
    };
    return $;
}