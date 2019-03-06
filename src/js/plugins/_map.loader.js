// 0: unload  1:loading  2: load
import _ from 'lodash';
import _trigger from '../core/_trigger';
(function ($) {
    var mapLoaded = 0;
    $.loadGMap = function () {
        var dfd = $.Deferred();
        //has load
        if (mapLoaded === 2) {
            dfd.resolve(window.google && window.google.map);
        } else {
            $(document).one('gMapLoaded', function () {
                dfd.resolve(window.google && window.google.map);
            });
            if (mapLoaded === 0) {
                mapLoaded = 1;
                //get ready to load
                var config = {
                    callback: 'googlemapcallback'
                };
                var mapUrl = 'https://maps.googleapis.com/maps/api/js?' + window.context.googleMapKey;
                $.each(config, function (key, value) {
                    mapUrl += ('&' + key + '=' + value);
                });
                $.preload({
                    files: [mapUrl],
                    type: 'js',
                    callback: 'googlemapcallback',
                }).then(function () {
                    mapLoaded = 2;
                    dfd.resolve(window.google && window.google.map);
                    $(document).trigger('gMapLoaded');
                });
            }
        }
        return dfd;
    };
})(jQuery);
