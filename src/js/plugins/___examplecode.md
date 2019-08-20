//seed code for create a plugin
//replace all of the "example" with the plugin name. (the plugin name should be same as the js file name);

import _trigger from '../core/_trigger';
export default { 
        name: 'example',
        defaultOpt: {},
        init: function($this, opt, exportObj) {},
        setOptionsBefore: null,
        setOptionsAfter: null,
        initBefore: null,
        initAfter: function($this, opt, exportObj) {},
        destroyBefore: function($this, opt, exportObj) {}
    };
    $.cui.plugin(exampleConfig);
    $(document).on('dom.load.example', function() {
        $('[data-example]').each(function(index, item) {
            var $this = $(item);
            var data = $this.data();
            $this.removeAttr('data-example');
            $this.example(data);
            $this.attr('data-example-load', '');
        });
    });

