export default function ($) {
    $.htmlencode = function (s) {
        $ = $ || window.$;
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(s));
        return div.innerHTML;
    };
    return $;
}