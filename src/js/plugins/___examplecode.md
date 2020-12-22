//seed code for create a plugin
//replace all of the "example" with the plugin name. (the plugin name should be same as the js file name);

import _trigger from '../core/_trigger';
export default {
    name: 'example',
    defaultOpt: {},
    init: function ($this, opt, exportObj) {
        exportObj.method =  function () {
          
        }
    },
    setOptionsBefore: null,
    setOptionsAfter: null,
    initBefore: null,
    initAfter: function ($this, opt, exportObj) {
        $this.on('click.example', exportObj.method);
    },
    destroyBefore: function ($this) {
        $this.off('click.example');
    }
};

