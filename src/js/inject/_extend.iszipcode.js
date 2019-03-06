export default function ($) {
    $ = $ || window.$;
    $.isZipcode = function (str) {
        return /^([0-9]){5}$/.test(str);
    };
    return $;
}