export default function ($) {
    $ = $ || window.$;
    $.debounce = function (func, waitTime, immediate) {
        var timeout, args, context, timestamp, result, wait = waitTime || 200;
        var later = function () {
            var last = +new Date() - timestamp;
    
            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
        };
        return function () {
            context = this;
            args = arguments;
            timestamp = +new Date();
            var callNow = immediate && !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }
            return result;
        };
    };
    return $;
}

