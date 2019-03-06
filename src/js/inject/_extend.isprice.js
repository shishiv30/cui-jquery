export default function ($) {
    $ = $ || window.$;
    $.isPrice = function (str) {
        return /^(([$])?((([0-9]{1,3},)+([0-9]{3},)*[0-9]{3})|[0-9]+)(\.[0-9]+)?)$/.test(str);
    };
    return $;
}