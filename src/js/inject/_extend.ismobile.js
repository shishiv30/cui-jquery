export default function ($) {
    $ = $ || window.$;
    var _isMobile = null;
    $.isMobile = function () {
        if (_isMobile !== null) {
            return _isMobile;
        }
        return _isMobile = !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    return $;
}