export default function ($) {
    $.loadImg = function ($img, imgSrc) {
        var tmpImg = new Image();
        tmpImg.src = imgSrc;
        tmpImg.onload = function (e) {
            if (e) {
                $img.attr('src', imgSrc).addClass('img-load-success');
            } else {
                $img.addClass('data-img-load-error');
            }
        };
    };
    return $;
}