export default function ($) {
    $ = $ || window.$;
    $.isMobile = window.navigator && !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    $.isTouch = 'ontouchstart' in window;
    return $;
}