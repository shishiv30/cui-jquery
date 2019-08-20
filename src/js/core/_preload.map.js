import $ from 'jquery';
import _preload from './_preload';
var mapLoaded = 0;
export default function (googleMapKey) {
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
            var mapUrl = 'https://maps.googleapis.com/maps/api/js?' + googleMapKey;
            $.each(config, function (key, value) {
                mapUrl += ('&' + key + '=' + value);
            });
            _preload({
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
}