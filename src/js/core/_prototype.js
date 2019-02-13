import moment from 'moment';
// For use moment.js convenience
Date.prototype.format = function (mask) {
    return moment(this).format(mask);
};

String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
};