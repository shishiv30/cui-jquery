var spyobserver = null;

function activeLink($this, key) {
	var $target = $this.find(`[href="#${key}"]`);
	if ($target[0]) {
		if (!$target.hasClass('active')) {
			$this.find('.active').removeClass('active');
			$target.addClass('active');
			var $list;
			if ($this.is('[data-role*="scrollbar"]')) {
				$list = $this;
			} else {
				$list = $this.find('[data-role*="scrollbar"]');
			}
			if ($list && $list.length) {
				var scrollLeft = $list.scrollLeft();
				var scrollWidth = $list.outerWidth();
				var targetLeft = $target.position().left;
				var targetWidth = $target.outerWidth();
				if (targetLeft < 0) {
					$list.scrollLeft(scrollLeft + targetLeft - 50);
				} else if (targetLeft + targetWidth > scrollWidth) {
					$list.scrollLeft(
						scrollLeft +
							(targetLeft + targetWidth - scrollWidth + 50)
					);
				}
			}
		}
	}
}
export default {
	name: 'scrollspy',
	defaultOpt: {
		buffer: '-10% 0px -90% 0px',
	},
	init: function ($this, opt, exportObj) {
		if (window.IntersectionObserver) {
			if (!spyobserver) {
				var $scroller = $.scrollParentY($this);
				const options = {
					root: $scroller && $scroller.length ? $scroller[0] : null,
					rootMargin: opt.buffer,
				};
				spyobserver = new window.IntersectionObserver((entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							activeLink($this, $(entry.target).attr('id'));
						}
					});
				}, options);
				$this.find('[href^="#"]').each(function () {
					var item = $($(this).attr('href'));
					if (item && item.length) {
						spyobserver.observe(item[0]);
					}
				});
			}
		}
	},
};
