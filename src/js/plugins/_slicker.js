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
    },
    init: function ($this, opt, exportObj) {
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
            $this.on('afterChange', _.debounce(function () {
                $.loadImage();
            }, 100));
            $this.on('setPosition', _.debounce(function () {
                $.loadImage();
            }, 100));
        }
        $this.slick(opt);
        $(document).on('dom.resize.slicker', function () {
            $this.slick('setPosition');
        });
        exportObj.next = function () {
            $this.slick('slickNext');
        };
        exportObj.prev = function () {
            $this.slick('slickPrev');
        };
        exportObj.go = function (index, noAnimate) {
            $this.slick('slickGoTo', index, noAnimate);
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

