import $ from 'jquery';
var resource = {
    js: {
        load: function (src, callback) {
            var dfd = $.Deferred();
            var script = document.createElement('script');
            if (callback) {
                window[callback] = function () {
                    dfd.resolve();
                };
            } else {
                script.onload = dfd.resolve;
                script.onerror = dfd.reject;
            }
            script.src = src;
            document.getElementsByTagName('head')[0].appendChild(script);
            return dfd;
        },
        cache: {}
    },
    css: {
        load: function (src) {
            var dfd = $.Deferred();
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = src;
            link.onload = dfd.resolve;
            link.onerror = dfd.reject;
            return dfd;
        },
        cache: {}
    },
};
var _getFiletype = function (filename) {
    if (!filename) {
        return;
    }
    return filename.substring(filename.lastIndexOf('.') + 1, filename.length);
};
var _loadResource = function (url, filetype, callback) {
    var type = filetype || _getFiletype(url);
    var loader = resource[type];
    if (loader && loader.cache) {
        if (loader.cache[url]) {
            return true;
        } else {
            loader.cache[url] = true;
            return loader.load(url, callback);
        }
    } else {
        return false;
    }
};
export default function (options) {
    var defaultOpt = {
        files: []
    };
    var opt = $.extend(defaultOpt, options);
    var resources = [];
    if (opt.files && opt.files.length) {
        opt.files.forEach(function (item) {
            resources.push(_loadResource(item, opt.type, opt.callback));
        });
    }
    return Promise.all(resources);
}

