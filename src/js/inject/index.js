import _context from './_context';
import _mousewheel from './_event.mousewheel';
import _gesture from './_event.gesture';
import _draggable from './_event.draggable';
import _gettextwidth from './_extend.gettextwidth';
import _htmldecode from './_extend.htmldecode';
import _htmlencode from './_extend.htmlencode';
import _loadimg from './_extend.loadimg';
import _isemail from './_extend.isemail';
import _isfloat from './_extend.isfloat';
import _isint from './_extend.isint';
import _isphone from './_extend.isphone';
import _isprice from './_extend.isprice';
import _iszipcode from './_extend.iszipcode';
import _renderhtml from './_extend.renderhtml';
import _localstorage from './_extend.localstorage';
import _debounce from './_extend.debounce';
import _throttle from './_extend.throttle';
import _scroll from './_extend.scroll';

export default function ($) {
	var injects = [
		_context,
		_mousewheel,
		_gesture,
		_draggable,
		_gettextwidth,
		_htmldecode,
		_htmlencode,
		_loadimg,
		_isemail,
		_isfloat,
		_isint,
		_isphone,
		_isprice,
		_iszipcode,
		_renderhtml,
		_localstorage,
		_debounce,
		_throttle,
		_scroll,
	];
	injects.forEach((e) => {
		e.call(window, $);
	});
}
