import _trigger from '../core/_trigger';
export default {
	name: 'scrollto',
	defaultOpt: {
		target: null,
		offsettop: null,
		scrollbefore: null,
		container: null,
		scrollafter: null,
	},
	init: function ($this, opt, exportObj) {
		$this.on('click', function (e) {
			opt.scrollbefore &&
				_trigger(opt.scrollbefore, $this, opt, exportObj);
			$.scrollTo(opt.target || $this.attr('href'), opt.position);
			opt.scrollafter && _trigger(opt.scrollafter, $this, opt, exportObj);
			return e.preventDefault();
		});
	},

	setOptionsBefore: null,
	setOptionsAfter: null,
	initBefore: null,
	initAfter: null,
	destroyBefore: null,
};
// $.cui.plugin(scrolltoConfig);
// $(document).on('dom.load.scrollto', function () {
//     $('[data-scrollto]').each(function (index, item) {
//         var $this = $(item);
//         var data = $this.data();
//         $this.scrollto(data);
//         $this.removeAttr('data-scrollto');
//         $this.attr('data-scrollto-load', '');
//     });
// });

// $(document).on('dom.scroll.scrollSpy', function () {
//     var status = $.cui_state;
//     $('[data-scrollspy]').each(function () {
//         var $item = $(this);
//         var offset = $($item.attr('data-offsettop'));
//         var target = $($item.data('target'));
//         var top = offset ? (status.scrollTop + offset.height()) : status.scrollTop;
//         top += 50;
//         var targetTop = target.offset().top;
//         var targetBottom = target.offset().top + target.height();
//         if (targetTop <= top && targetBottom > top) {
//             $(document).trigger($item.data('onscroll'), [$(this)]);
//             return false;
//         }
//     });
// });
