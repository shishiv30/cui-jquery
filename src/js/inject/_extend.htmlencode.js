export default function ($) {
    $ = $ || window.$;
    $.htmlencode = function (s) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(s));
        return div.innerHTML;
    };
    return $;
}