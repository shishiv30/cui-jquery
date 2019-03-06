import _ from 'lodash';
import $ from 'jquery';
export default function (name) {
    name = Plugin.namespace + '.' + name;
    var params = Array.prototype.slice.call(arguments);
    params = params.slice(1, params.length);
    if (_.isFunction(name)) {
        name.apply(this, params);
    } else {
        $(document).trigger(name, params);
    }
};