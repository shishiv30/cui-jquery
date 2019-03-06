import mustache from 'mustache';
export default function ($) {
    $ = $ || window.$;
    $.renderHtml = function (template, data) {
        return mustache.render(template, data);
    };
    return $;
}