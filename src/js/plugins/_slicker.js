import _ from 'lodash';
import _trigger from '../core/_trigger';
export default {
    name: 'slicker',
    defaultOpt: {
        lazyload: 1,
        arrows: true,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoscroll: 0,
        width: 375,
        padding: 0,
        index: 0,
        responsive: true,
        target: 'ul'
    },
    init: function ($this, opt, exportObj) {
        var $target = $this.find(opt.target);
        if (opt.autoscroll) {
            opt.autoplay = true;
            opt.autoplaySpeed = opt.autoscroll;
        }
        if (opt.responsive) {
            opt.responsive = [{
                breakpoint: 9999,
                settings: {
                    arrows: true,
                    centerMode: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            }, {
                breakpoint: opt.width * 3 + opt.padding * 2,
                settings: {
                    arrows: true,
                    centerMode: false,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: opt.width * 3 - opt.padding * 2,
                settings: {
                    arrows: true,
                    centerMode: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: opt.width * 2 + opt.padding * 2,
                settings: {
                    arrows: true,
                    centerMode: false,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: opt.width * 2 - opt.padding * 2,
                settings: {
                    arrows: false,
                    centerMode: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }, {
                breakpoint: opt.width + opt.padding * 2,
                settings: {
                    arrows: false,
                    centerMode: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
            ];
        }
        opt.centerPadding = opt.padding + 'px';
        opt.initialSlide = opt.index;
        delete opt.index;
        delete opt.padding;
        delete opt.width;
        delete opt.autoscroll;
        if (opt.lazyload) {
            $target.on('afterChange', _.debounce(function () {
                $(document).trigger('dom.scroll.image');
            }, 100));
            $target.on('setPosition', _.debounce(function () {
                $(document).trigger('dom.scroll.image');
            }, 100));
        }
        $target.slick(opt);
        $(document).on('dom.resize.slicker', function () {
            $target.slick('setPosition');
        });
        exportObj.next = function () {
            $target.slick('slickNext');
        };
        exportObj.prev = function () {
            $target.slick('slickPrev');
        };
        exportObj.go = function (index, noAnimate) {
            $target.slick('slickGoTo', index, noAnimate);
        };
    }
};
// $.cui.plugin(slickerConfig);
// $(document)
//     .on('dom.load.slicker', function () {
//         $('[data-slicker]')
//             .each(function (index, item) {
//                 var $this = $(item);
//                 $this.removeAttr('data-slicker');
//                 var data = $this.data();
//                 $this.slicker(data);
//                 $this.attr('data-slicker-load', '');
//             });
//     });

