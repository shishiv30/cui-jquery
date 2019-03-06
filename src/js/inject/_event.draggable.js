//draggable
var hasTouch = 'ontouchstart' in window,
    startEvent = hasTouch ? 'touchstart' : 'mousedown',
    moveEvent = hasTouch ? 'touchmove' : 'mousemove',
    endEvent = hasTouch ? 'touchend' : 'mouseup';
var eventDraggableSetting = {
    setup: function () {
        var $this = $(this);
        // bind event once for all the drag
        if (!$this.data('_drag')) {
            $this.data('_drag', true);
        } else {
            return;
        }
        var _config = {
            start: null,
            end: null,
            trackDistance: null,
            swipeDistance: null,
            currPos: null,
            startTime: null,
            endTime: null,
            currTime: null,
            direction: null,
            duration: null
        };
        var _resetConfig = function () {
            _config.start = null;
            _config.end = null;
            _config.trackDistance = null;
            _config.swipeDistance = null;
            _config.currPos = null;
            _config.startTime = null;
            _config.endTime = null;
            _config.currTime = null;
            _config.direction = null;
            _config.duration = null;
        };
        var _getDist = function (start, curr) {
            return [
                start[0] - curr[0],
                start[1] - curr[1],
            ];
        };
        var _getDir = function (start, curr) {
            return [
                (start[0] < curr[0]) ? 'left' : 'right',
                (start[1] > curr[1]) ? 'down' : 'up'
            ];
        };
        var _getPoint = function (eventObj) {
            return [parseInt(eventObj.pageX), parseInt(eventObj.pageY)]
        }
        var _trackSwipe = function () {
            if (_config.start && _config.currPos) {
                _config.direction = _getDir(_config.start, _config.currPos);
                _config.trackDistance = _getDist(_config.start, _config.currPos);

                // Run the tracking callback.
                $this.trigger('dragging', [
                    _config.direction,
                    _config.trackDistance,
                    _config.currPos,
                    _config.start,
                    parseInt(_config.currTime - _config.startTime)
                ]);
            }
        };
        var _confirmSwipe = function () {
            // Set up the direction property.
            if (_config.start && _config.currPos) {
                _config.direction = _getDir(_config.start, _config.currPos);
                _config.swipeDistance = _getDist(_config.start, _config.end);
                $this.trigger('dragged', [
                    _config.direction,
                    _config.swipeDistance,
                    parseInt(_config.endTime - _config.startTime)
                ]);
                // Reset the variables.
                _resetConfig();
            }
        };
        $this.on(startEvent + '.cui.draggable', function (t) {
            var e = t.originalEvent;
            if ((e.targetTouches && 1 === e.targetTouches.length) || !hasTouch) {
                var eventObj = hasTouch ? e.targetTouches[0] : e;
                _config.startTime = Date.now();
                _config.start = _getPoint(eventObj);
                $this.trigger('drag');
            }
        });
        $this.on(moveEvent + '.cui.draggable', function (t) {
            var e = t.originalEvent;
            if (_config.start && ((e.targetTouches && 1 === e.targetTouches.length) || !hasTouch)) {
                var eventObj = hasTouch ? e.targetTouches[0] : e;
                _config.currTime = Date.now();
                _config.currPos = _getPoint(eventObj);
                _trackSwipe();
            }
            e.preventDefault();
        });
        $this.on(endEvent + '.cui.draggable mouseleave.cui.draggable', function (t) {
            var e = t.originalEvent;
            var eventObj = hasTouch ? e.changedTouches[0] : e;
            // Set the end event related properties.
            _config.endTime = Date.now();
            _config.end = _getPoint(eventObj);
            // Run the confirm swipe method.
            _confirmSwipe();
            // e.preventDefault();
        });
    },
    teardown: function () {
        var $this = $(this);
        $this.off(startEvent + '.cui.draggable');
        $this.off(moveEvent + '.cui.draggable');
        $this.off(endEvent + '.cui.draggable');
    }
};

export default function ($) {
    $ = $ || window.$;
    //the draggable event is side effects of $
    $.event.special.drag = $.event.special.dragging = $.event.special.dragged = $.event.special.dragout = eventDraggableSetting;
    return $;
}

