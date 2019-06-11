import _ from 'lodash';
import _trigger from './_trigger';
import loadMap from './_preload.map';
class Plugin {
    constructor(PluginSetting, $) {
        this.setting = _.assignIn({
            name: '',
            defaultOpt: null,
            initBefore: null,
            init: null,
            initAfter: null,
            setOptionsBefore: null,
            setOptionsAfter: null,
            destroyBefore: null,
            exports: {},
            isThirdPart: false,
        }, PluginSetting);

        if (!Plugin.isRegister(this.setting.name)) {
            Plugin.records.push(this.setting.name);
            this.register($);
        }
    }
    static namespace = 'cui';
    static records = [];
    static isRegister = function (key) {
        return Plugin.records.indexOf(key) >= 0;
    };
    static dependenceHandler(key) {
        if (key == 'googlemap') {
            return loadMap();
        }
    };

    _beforeInital($this, opt) {
        //before Plugin initial event
        _trigger('init.before.' + this.setting.name, $this, opt);
        opt.initbefore && _trigger(opt.initbefore, $this, opt);
        //before Plugin initial custom event
        this.setting.initBefore && _trigger(this.setting.initBefore, $this, opt);
    };
    _afterInital($this, opt, exportObj) {
        this.setting.initAfter && this.setting.initAfter($this, opt, exportObj);
        opt.initafter && _trigger(opt.initafter, $this, opt, exportObj);
        //after Plugin initial event
        _trigger('cui.init.after.' + this.setting.name, $this, opt, exportObj);
    }

    _handleGetOptions($this, opt, exportObj) {
        //before set options
        var that = this;
        return function () {
            that.setting.getOptionsBefore && that.setting.getOptionsBefore($this, opt, exportObj);
            return opt;
        }
    }
    _handleSetOptions($this, opt, exportObj) {
        var that = this;
        return function (options) {
            //before set options
            that.setting.setOptionsBefore && that.setting.setOptionsBefore($this, opt, exportObj);
            that.setting.opt = _.assignIn(opt, options);
            //after set options
            that.setting.setOptionsAfter && that.setting.setOptionsAfter($this, opt, exportObj);
        };
    }
    _handleDestroy($this, opt, exportObj) {
        var that = this;
        return function () {
            //before Plugin destroy event
            _trigger('cui.before.destroy.' + this.setting.name, $this, opt, exportObj);
            //before Plugin destroy custom event
            that.setting.destroyBefore && that.setting.destroyBefore($this, opt, exportObj);
            $this.data(this.setting.name, null);
        };
    }
    _handleExports($this, opt, exportObj) {
        if (this.setting.isThirdPart && exportObj.original) {
            exportObj.original = _.isFunction(exportObj.original) ? exportObj.original($this, opt, exportObj) : exportObj.original;
        }
        //initial get options of Plugin
        exportObj.getOptions = this._handleGetOptions($this, opt, exportObj);
        //initial set options of Plugin
        exportObj.setOptions = this._handleSetOptions($this, opt, exportObj);
        //destroy export for the Plugin
        exportObj.destroy = this._handleDestroy($this, opt, exportObj);
    }
    create($this, options) {
        var that = this;
        //#1 before initial Plugin
        this._beforeInital($this, options)

        //#2 initial Plugin input (opt) & output (exportObj)
        var opt = _.assignIn({}, this.setting.defaultOpt, options);
        var exportObj = {};

        //#3 initial Plugin
        this.setting.init && this.setting.init($this, opt, exportObj);

        //#4 handle output
        this._handleExports($this, opt, exportObj);

        //#5 after Plugin initial
        this._afterInital($this, opt, exportObj);

        return exportObj;
    };
    register($) {
        var name = Plugin.namespace + '_' + this.setting.name;
        var that = this;
        $.fn[name] = function (options) {
            var $this = $(this);
            var exportObj = $this.data(that.setting.name);
            if (exportObj && typeof (exportObj) !== 'string') {
                if (options) {
                    exportObj.setOptions && exportObj.setOptions(options);
                }
                return exportObj;
            }
            //todo start made all lifecircle point handler only return function as handler
            var excutePlugin = function () {
                var obj = that.create($this, options);
                $this.data(that.setting.name, obj);
                return obj;
            };
            if (that.setting.dependence) {
                var dfd = $.Deferred();
                Plugin.dependenceHandler(that.setting.dependence).then(function () {
                    dfd.resolve(excutePlugin());
                });
                return dfd;
            } else {
                return excutePlugin();
            }
        };
    }
}
export default Plugin;