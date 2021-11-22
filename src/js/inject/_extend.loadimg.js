export default function ($) {
	$ = $ || window.$;
	$.loadImg = function ($img, imgSrc) {
		var dfd = $.Deferred();
		$img.removeClass('img-load-error img-load-success');
		$img.one('load', function () {
			$img.addClass('img-load-success');
			dfd.resolve();
		});
		$img.one('error', function () {
			$img.addClass('img-load-error');
			$(document).trigger('img.error', [imgSrc]);
			dfd.resolve();
		});
		if (imgSrc) {
			$img.attr('src', imgSrc);
		} else {
			$img.addClass('img-load-error');
			$(document).trigger('img.error', [imgSrc]);
		}
		return dfd;
	};
	return $;
}
