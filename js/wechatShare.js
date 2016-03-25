/**
 * Created by WWQ on 2016/3/14 0014.
 */

//使用方法：
//var share= wechatShare(); //初始化
//share.popShow();  //弹窗

window.wechatShare = function () {
    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            return true;
        } else {
            return false;
        }
    }

    function popHide() {
        $('.sharePop').hide();
    };
    !function init() {
        var img = new Image();
        img.src = 'http://static.chinahr.com/themes/op/m/58group/img/sharePopLeftTop.png';

        $('head').append('<style>.sharePop{display:none;position:fixed;z-index: 100; top:0;left:0;background:rgba(0,0,0,0.9);width:100%;height:115%;overflow:hidden}.sharePop .topLeft{width:100%;height:35%;background:url("http://static.chinahr.com/themes/op/m/58group/img/sharePopLeftTop.png") no-repeat right top;background-size:contain}.sharePop .text div:first-child{margin-top:1rem;text-align:center;color:#f5d801;font-size:2.2rem;font-weight:600}.sharePop .text div:last-child{text-align:center;color:white;font-size:2.7rem;margin-bottom:7rem}.sharePop .sharePopWave{width:100%;display:block;margin-bottom: -3px;}.sharePop .sharePopBottom{width:100%;height:14rem;background:#f5d801}.sharePop .radishes{position:absolute;width:100%;top:60%}.sharePop .radishes>img{margin:auto;display:block;width:3rem}</style>')
        $('body').append('<div class="sharePop"><div class="topLeft"></div><div class="text"><div>分享招聘信息</div><div>人人都是超级HR</div></div><div class="radishes"><img src="http://static.chinahr.com/themes/op/m/58group/img/sharePopRadish.png" alt=""/><img src="http://static.chinahr.com/themes/op/m/58group/img/sharePopRadish.png" alt=""/><img src="http://static.chinahr.com/themes/op/m/58group/img/sharePopRadish.png" alt=""/></div><img class="sharePopWave" src="http://static.chinahr.com/themes/op/m/58group/img/second_wave1.png"><div class="sharePopBottom"></div></div>');
    }();


    if (isWeiXin()) {
        var bp = document.createElement('script');
        bp.src = 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js';
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);

        bp.onload = function () {

            var val = encodeURIComponent(window.location.href);
            $.ajax({
                url: "http://wezp.chinahr.com/js/sign?rawurl=" + val,
                type: "get",
                dataType: "jsonp",
                success: function (result) {                    
                    var url = window.location.href ,
                        shareImgUrl = '',
                        id = '',
                        title='',
                        desc='',
                        type = '';
                        
                    //修复锚点分享，跳转到锚点
                    if(!!window.location.hash){
                        url = url.split(window.location.hash)[0] + url.split(window.location.hash)[1];
                    };
                    
                    if (url.indexOf('company') > -1) {
                        id = ( url.indexOf('comid') > -1) ? url.split('comid=')[1] : '';
                        
                        switch (id) {
                            case '':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/shouye.jpg';
                                title = '林允杨幂范冰冰还不够！神奇工场寻找宇宙唯一的你！';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case '7f89ae84838c7e5526feb7fcj':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/wuba.jpg';
                                title = '林允杨幂范冰冰还不够！神奇工场寻找宇宙唯一的你！';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case 'd9fab0e43556d9564953f960j':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/anjuke.jpg';
                                 title = '安居客正在重金寻找互联网行业大牛，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case '0376b0e410ccaa56e2c1277bj':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/doumi.jpg';
                                 title = '斗米兼职正在重金寻找互联网行业大牛，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case 'd9fab0e44ae1d6567a51f960j':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/chr.jpg';
                                 title = '中华英才网正在寻找互联网行业大牛，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case '2ae9b0e49059e156c716b363j':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/haozu.jpg';
                                 title = '好租正在重金寻找互联网行业大牛，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case '4c87b0e4ef90e65656bad195j':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/xinchong.jpg';
                                title = '58心宠正在重金寻找互联网行业大牛，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case '4c87b0e4cf2fe656c6b9d195j':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/daojia.jpg';
                                 title = '58到家正在重金寻找互联网行业大牛，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case 'd9fab0e44845cd56a40cf960j':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/chuanghuizhi.jpg';
                                title = '创汇智正在重金寻找互联网行业大牛，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case '7c4bb0e422d9e856f1451c66j':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/273.jpg';
                                 title = '273二手车网正在寻找互联网行业大牛，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case '4c87b0e49a09e9563bbcd195j':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/baojia.jpg';
                                 title = '宝驾租车正在寻找互联网行业大牛，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case '7c4bb0e4fba8e756f5441c66j':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/chewang.jpg';
                                title = '58车正在重金寻找互联网行业大牛，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case '4c87b0e499f9e8561abcd195j':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/guazi.jpg';
                                 title = '瓜子二手车正在寻找互联网行业大牛，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case 'd9fab0e4f9fae756f15bf960j':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/tubatu.jpg';
                                 title = '土巴兔正在重金寻找互联网行业大牛，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case '3a28ae844c6d2755d7fc89b3j':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/guagua.jpg';
                                 title = '呱呱洗车正在重金寻找互联网行业大牛，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case '2ae9b0e49596ea564b1cb363j':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/meidaojia.jpg';
                                 title = '美到家正在重金寻找互联网行业大牛，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case 'd9fab0e4f779e656c45af960j':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/diandao.jpg';
                                 title = '点到按摩正在寻找互联网行业大牛，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case '2ae9b0e473a8e6566f19b363j':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/xueche.jpg';
                                 title = '58学车正在重金寻找互联网行业大牛，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case '4c87b0e41cb9eb5641bed195j':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/cheliu.jpg';
                                 title = '车流网正在重金寻找互联网行业大牛，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case '7c4bb0e4a873f356e84b1c66j':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/yuesao.jpg';
                                 title = '58月嫂正在寻找互联网行业大牛，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                        }
                    }
                    else if (url.indexOf('jobdetail') > -1) {
                        type = ( url.indexOf('type') > -1) ? url.split('type=')[1] : '';
                        switch (type) {
                            case 'rd':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/rd.jpg';
                                 title = '神奇工场重金寻找研发攻城狮，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case 'qa':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/qa.jpg';
                                 title = '神奇工场重金寻找测试攻城狮，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case 'po':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/po.jpg';
                                 title = '神奇工场重金寻找万能运营喵，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case 'pm':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/pm.jpg';
                                 title = '神奇工场重金寻找无敌产品汪，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case 'ui':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/ui.jpg';
                                 title = '神奇工场重金寻找颜控设计师，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case 'ue':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/ue.jpg';
                                 title = '神奇工场重金寻找交互设计师，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case 'mk':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/mk.jpg';
                                 title = '神奇工场重金寻找市场大牛，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case 'pr':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/pr.jpg';
                                 title = '神奇工场重金寻找公关大牛，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case 'sk':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/sk.jpg';
                                 title = '神奇工场重金寻找销售精英，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case 'boss':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/boss.jpg';
                                 title = '神奇工场重金寻找高管接班人，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                            case 'ad':
                                shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/ad.jpg';
                                 title = '神奇工场重金寻找职能类高级人才，是你么？';
                                desc = '1000个互联网抢手职位，大平台等你来！';
                                break;
                        }
                    }
                    else{   
                         title = '林允杨幂范冰冰还不够！神奇工场寻找宇宙唯一的你！';
                        desc = '1000个互联网抢手职位，大平台等你来！';
                        shareImgUrl = 'http://static.chinahr.com/themes/op/m/58group/img/wechatShare/shouye.jpg';
                    }

                    //添加埋点参数
                    // if(url.indexOf("utm_source=market") == -1){
                    //     url = url + '&utm_source=market&spm=b-32948702282246-me-f-845.58wechat';
                    // };
                    
                    if (result) {
                        wx.config({
                            appId: result.appid,
                            timestamp: result.timestamp,
                            nonceStr: result.nonceStr,
                            signature: result.signature,
                            jsApiListing: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'],
                            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
                        });
                        wx.ready(function () {
                            wx.onMenuShareTimeline({
                                title: title,
                                imgUrl: shareImgUrl,
                                link: url,
                                success: function () {
                                    clickLog('58enterprises');
                                },
                                cancel: function () {
                                }
                            });
                            wx.onMenuShareAppMessage({
                                title: title,
                                desc:desc,
                                imgUrl: shareImgUrl,
                                link: url,
                                success: function () {
                                    clickLog('58enterprises');
                                },
                                cancel: function () {
                                }
                            });
                            wx.onMenuShareQQ({
                                title: title,
                                desc:desc,
                                imgUrl: shareImgUrl,
                                link: url,
                                success: function () {
                                    clickLog('58enterprises');
                                },
                                cancel: function () {
                                }
                            });
                            wx.onMenuShareWeibo({
                                title: title,
                                desc:desc,
                                imgUrl: shareImgUrl,
                                link: url,
                                success: function () {
                                    clickLog('58enterprises');
                                },
                                cancel: function () {
                                }
                            });
                            wx.onMenuShareQZone({
                                title: title,
                                desc:desc,
                                imgUrl: shareImgUrl,
                                link: url,
                                success: function () {
                                    clickLog('58enterprises');
                                },
                                cancel: function () {
                                }
                            });
                        });

                    }
                }
            });


        }

    }
    return {
        popShow: function () {
            
            $('.sharePop').show();
            $('.sharePop').bind('touchstart.pop', function (e) {
                e.preventDefault();
                setTimeout(function () {
                    e.preventDefault();
                    popHide();
                    $('.sharePop').off('touchstart.pop');
                },320);

            });
        }
    }
}
