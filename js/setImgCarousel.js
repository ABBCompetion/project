/**
 * Created by WWQ on 2016/3/12 0012.
 */

//传入图片数组、插入父节点选择器名，图片左右margin; 返回：{nextSlide:function（切换到下一张），lastSlide：function（切换到上一张） }

// example:
//var carousel = setImgCarousel(["./img/4.jpg", "./img/5.jpg", "./img/6.jpg"], '.div', '1rem');



function setImgCarousel(imgUrlArr, parentSeletor, margin) {
    var jsStr = '<div class="W_carousel"><div class="main"><div class="silk"></div></div></div>'
    $('head').append($('<style>.W_carousel{width:100%;height:100%;margin: 0;padding: 0;} .W_carousel *{margin: 0;padding: 0;} .W_carousel .main{width:100%;height:100%;position:relative;overflow:hidden;background-color:white;}.W_carousel .main .silk{white-space:nowrap;height:100%;position:absolute;padding-bottom:0rem;overflow:auto;left:0;}.W_carousel .silk img{margin:0 ' + margin + ';height:100%;display:inline-block;}</style>'))
    $(parentSeletor).append($(jsStr));

    var component = {
        main: $('.W_carousel .main'),
        silk: $('.W_carousel .main .silk')
    };
    var i = 0,
        str = '';
    for (; i < imgUrlArr.length; i++) {
        str += '<img src=' + imgUrlArr[i] + '>';
    }
    component.silk.append($(str));

    var imgs = $('.W_carousel .silk img'),
        startX = 0,
        currentX = 0,
        changeX = 0,
        silkStartLeft = 0,
        silkWidth = 0,
        windowWidth = 0,
        imgWidth = 0,
        leftLimit = 0,
        rightLimit = 0;

    imgs.each(function () {
        $(this).width(component.main.width())
    });

    setTimeout(function () {
        silkWidth = component.silk.width();
        windowWidth = $(window).width();
        imgWidth = imgs.width();
        leftLimit = -(silkWidth - imgWidth + windowWidth / 5);
        rightLimit = windowWidth / 5;
    }, 10);
    component.silk.bind('touchstart', function (e) {
        e.preventDefault();
        startX = e.touches[0].clientX;
        silkStartLeft = parseFloat($(this).css('left'));
    });
    component.silk.bind('touchmove', function (e) {
        e.preventDefault();
        var left;
        currentX = e.touches[0].clientX;
        changeX = startX - currentX;
        left = silkStartLeft - changeX;

        if (left > rightLimit) {
            left = rightLimit;
        }
        else if (left < leftLimit) {
            left = leftLimit
        }
        $(this).css('left', left);
    });

    component.silk.bind('touchend', function (e) {
        e.preventDefault();
        var arr = [],
            minValue = 0,
            minVal = {
                index: 0,
                val: Infinity
            },
            mainOffsetLeft = component.main.offset().left;
        changeX = 0;
        startX = 0;
        //设置弹性效果
        imgs.each(function (index) {
            var distanceAbs = Math.abs($(this).offset().left - mainOffsetLeft);
            if (distanceAbs < minVal.val) {
                minVal.index = index;
                minVal.val = distanceAbs;
            }
        });
        component.silk.animate({'left': parseFloat(component.silk.css('left')) - (imgs.eq(minVal.index).offset().left - mainOffsetLeft)}, 200, 'linear');
    });
    component.silk.trigger('touchend');
    return {
        nextSlide: function () {
            var toPos = (parseFloat(component.silk.css('left')) - imgWidth),
                pos = toPos < leftLimit ? leftLimit : toPos;

            component.silk.animate({'left': pos}, 200, 'linear', function () {
                component.silk.trigger('touchend');
            });

        },
        lastSlide: function () {
            var toPos = (parseFloat(component.silk.css('left')) + imgWidth),
                pos = toPos > rightLimit ? rightLimit : toPos;
            component.silk.animate({'left': pos}, 200, 'linear', function () {
                component.silk.trigger('touchend');
            });
        }
    }
}

