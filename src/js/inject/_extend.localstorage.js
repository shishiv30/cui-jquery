export default function ($) {
    $.setItem = function (key, value) {
        if(typeof(value)  === 'object'){
            value = JSON.stringify(value);
        }
        window.localStorage.setItem(key, value);
    };
    $.getItem = function (key) {
        var value = window.localStorage.getItem(key) || '';
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    }
    return $;
}