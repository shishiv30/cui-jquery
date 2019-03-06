export default function ($) {
    $ = $ || window.$;
    $.htmldecode = function (s) {
        var div = document.createElement('div');
        div.innerHTML = s;
        return div.innerText || div.textContent;
    };
    return $;
}