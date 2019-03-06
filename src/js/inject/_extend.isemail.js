export default function ($) {
    $ = $ || window.$;
    $.isEmail = function (str) {
        return /^([\w-]+@([\w-]+\.)+[\w-]{2,4})?$/.test(str);
    };
    return $;
}