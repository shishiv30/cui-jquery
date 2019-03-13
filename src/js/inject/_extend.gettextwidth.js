var tmpdiv;
export default function ($) {
    $ = $ || window.$;
    $.getTextWidth = function (text, fontsize) {
        var $body = $('body');
        fontsize = fontsize || $body.css('fontSize').replace(/[a-z]/g, '') * 1;
        if (!tmpdiv) {
            tmpdiv = $('<div></div>').css({
                position: 'absolute',
                visibility: 'hidden',
                height: 'auto',
                width: 'auto',
                whiteSpace: 'nowrap'
            });
            $body.append(tmpdiv);
        }
        tmpdiv.css('fontSize', fontsize);
        tmpdiv.text(text);
        return tmpdiv.width();
    }
    return $;
}