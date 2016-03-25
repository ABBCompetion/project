 /**
  * @date:2016/03/13
  * @author:Adam
  */
$(function() {
        //优化用户体验
       var timeoutId = null;
       (function(){
              var value = ["加载中.","加载中..","加载中...","加载中...."];
              for (var i = 0; i<4;i++) {
                i = i === 4 ? 0 : i; 
                $("#loading").text(value[i]);
              };
              timeoutId = window.setTimeout(arguments.callee,1000);
       })();

       function optimize(){
            $("#loading").hide();
            $(".nav").show();
            $(".boss").show();
            $(".develop").show();
            $(".positions").show();
            window.clearTimeout(timeoutId);
       };

       function mySwiper(){
	     var mySwiper = new Swiper ('.swiper-container', {
      		loop: true,
		centeredSlides: true,
                effect: 'flip',
		autoplay: 2000,
              nextButton: '.right',
              prevButton: '.left'
   	 });
      };

       function toTop(){
                  var toTop = $(".toTop"),h = $(window).height() / 5,navTop = $(".n").offset().top;
                  $(window).on('scroll', function(event) {
                  var t = document.documentElement.scrollTop || document.body.scrollTop;
                        if(t>h){
                                    toTop.show();
                              }else{
                                    toTop.hide();
                              }

                        if(navTop+15<t){
                              $("#top").show();
                              $(".n>div").hide();
                        }else{
                              $("#top").hide();
                               $(".n>div").show();
                        }
                   });
             };
      toTop();    

      function addEventListener (comId) {
          $(document).on('touchend', '#more', function(event) {
                      $('.mask').length === 0 ? ($('body').append('<div class="mask"></div>'),$('.mask').width($(document).width()).height($(document).height())) :
                      $('.mask').show();
                      $('.selectCities').show();
                      $(this).removeClass().addClass('on').siblings().removeClass().addClass('off');
                      clickLog('from=chr_58lianhe_com_city');
                 }).on('touchend', '#bj,#sh,#other', function(event) {
                      $(this).removeClass().addClass('on').siblings().removeClass().addClass('off');
                      getJobList(comId,$(this).data('cityId'));
                      clickLog('from=chr_58lianhe_com_city');
                 }).on('click', '.top', function(event) {
                        $('.selectCities').hide();
                        $('.mask').hide();
                 }).on('click', '.cities span', function(event) {
                     $('.selectCities').hide();
                     $('.mask').hide();
                     getJobList(comId,$(this).parent().data("cityId"));
                     clickLog('from=chr_58lianhe_com_city');
                 });
      };

       function share(){
            var share = wechatShare();
            $("#share").on('click', function(event) {
              share.popShow();
            });
            $(".sharePop").css('z-index', 1000);
       };
       
       //获取企业信息及渲染页面
       function getComInfo(){
            var baseUrl = 'http://op.chinahr.com/58group/',
            comId = window.location.search.split('comid=')[1].split(/#|&/)[0],
            $logo = $('.nav_top img'),
            $name = $(".nav_center span"),
            $tag = $("#tag"),
            $description = $("#description"),
            $one = $("[type='one']"),
            $two = $("[type='two']"),
            $three = $("[type='three']"),
            $developItems = $(".develop_items"),
            $slide = $(".swiper-wrapper");
    
            $.ajax({
                    type: 'GET',
                    url: baseUrl + 'getCorpDetailInfoById',
                    dataType:'json',
                    data: {
                      comId:comId,
                    },
                    success: function (data) {
                        // console.log(data);
                        if (data['isSuccess'] && !!data.entity) {
                            $logo.attr('src', 'http://static.chinahr.com/themes/op/m/58group/img/logo/'+ comId +'.jpg');
                            $logo.on('error', function(event) {
                                $(this).attr('src','http://static.chinahr.com/themes/op/m/58group/img/imgError.jpg');
                            });
                            $name.html(data.entity.comName);
                            $description.html(data.entity.desc);
                            //皇冠标签
                            if(!!data.entity.tags && !!data.entity.tags.length){
                                for (var i = 0; i < data.entity.tags.length; i++) {
                                    $tag.children().eq(i).html(data.entity.tags[i]);
                                };
                            };
                            //超级BOSS团
                            if(data.entity.team.length===1){
                                $three.remove();
                                $two.remove();
                                $one.css('width', '100%');
                                $($one[0]).find('div').css('background-image', 'url(http://imgs.chinahr.com/images/content58/'+data.entity.team[0].avatar+')');
                                $($one[1]).find('div').eq(0).html(data.entity.team[0].name);
                                $($one[1]).find('div').eq(2).html(data.entity.team[0].desc);
                            }else if(data.entity.team.length === 2) {
                                $three.remove();
                                $one.css('width', '50%');
                                $two.css('width', '50%');
                                $($one[0]).find('div').eq(0).css('background-image', 'url(http://imgs.chinahr.com/images/content58/'+data.entity.team[0].avatar+')');
                                $($two[0]).find('div').eq(0).css('background-image', 'url(http://imgs.chinahr.com/images/content58/'+data.entity.team[1].avatar+')');
                                $($one[1]).find('div').eq(0).html(data.entity.team[0].name);
                                $($one[1]).find('div').eq(2).html(data.entity.team[0].desc);
                                $($two[1]).find('div').eq(0).html(data.entity.team[1].name);
                                $($two[1]).find('div').eq(2).html(data.entity.team[1].desc);
                            }else if(data.entity.team.length ===3 ){
                                $($one[0]).find('div').eq(0).css('background-image', 'url(http://imgs.chinahr.com/images/content58/'+data.entity.team[0].avatar+')');
                                $($two[0]).find('div').eq(0).css('background-image', 'url(http://imgs.chinahr.com/images/content58/'+data.entity.team[1].avatar+')');
                                $($three[0]).find('div').eq(0).css('background-image', 'url(http://imgs.chinahr.com/images/content58/'+data.entity.team[2].avatar+')');
                                $($one[1]).find('div').eq(0).html(data.entity.team[0].name);
                                $($one[1]).find('div').eq(2).html(data.entity.team[0].desc);
                                $($two[1]).find('div').eq(0).html(data.entity.team[1].name);
                                $($two[1]).find('div').eq(2).html(data.entity.team[1].desc);
                                 $($three[1]).find('div').eq(0).html(data.entity.team[2].name);
                                $($three[1]).find('div').eq(2).html(data.entity.team[2].desc);
                            };
                            //企业成长纪
                            if(!!data.entity.timeLine && !!data.entity.timeLine.length){
                                for (var i = 0; i < data.entity.timeLine.length; i++) {
                                    var cTemplate = '<div class="develop_item"><ul ><li><div><span>'+
                                    data.entity.timeLine[i].time+'</span></div></li><li><div>'+
                                    data.entity.timeLine[i].desc+'</div></li></ul><div></div></div>';
                                    $developItems.append(cTemplate);
                                };
                                $('.develop_item').last().children('div').remove();
                            };
                            //轮播图
                            if(!!data.entity.photos && !!data.entity.photos.length){
                                for (var i = 0; i < data.entity.photos.length; i++) {
                                    // data.entity.photos[i] = "./img/wuxiubo.png";
                                    var pTemplate =  '<div class=\'swiper-slide\'><img src="http://imgs.chinahr.com/images/content58/'+
                                    data.entity.photos[i]+'" alt=""></div>';
                                    $slide.append(pTemplate);
                                };
                                $('.swiper-slide img').each(function (e) {
                                    $(this).on('error', function(event) {
                                        $(this).attr('src','http://static.chinahr.com/themes/op/m/58group/img/imgError.jpg');
                                    });
                                });
                               mySwiper();
                            };
                            optimize();
                            getCityInfo();
                            
                            
                        }else {
                            console.log(data['returnMessage']);
                        };
                    
                    },
                    error: function () {
                        console.log('error');
                    },
                });
     };
     getComInfo();
     //获取城市列表
     function getCityInfo(){
            var baseUrl = 'http://op.chinahr.com/58group/',
            comId = window.location.search.split('comid=')[1].split(/#|&/)[0],
            $bj = $("#bj"),
            $sh = $("#sh"),
            $other = $("#other"),
            $more = $("#more"),
            $cities = $(".cities");
            $.ajax({
                    type: 'GET',
                    url: baseUrl + 'getCityList',
                    dataType:'json',
                    data: {
                      comId:comId,
                    },
                    success: function (data) {
                        // console.log(data);
                        if (data['isSuccess']) {
                          if(!!data.entity && !!data.entity.length){
                              var cityId = data.entity[0].cityId;
                              getJobList(comId, cityId);
                              switch(data.entity.length)
                              {
                              case 1:
                                $(".positions_city").empty();
                                break;
                              case 2:
                                $more.remove();
                                $other.remove();
                                $bj.text(data.entity[0].cityName).data('cityId', data.entity[0].cityId);
                                $sh.text(data.entity[1].cityName).data('cityId', data.entity[1].cityId);
                                break;
                              case 3:
                                $more.remove();
                                $bj.text(data.entity[0].cityName).data('cityId', data.entity[0].cityId);
                                $sh.text(data.entity[1].cityName).data('cityId', data.entity[1].cityId);
                                $other.text(data.entity[2].cityName).data('cityId', data.entity[2].cityId);
                                break;
                              default:
                                $other.remove();
                                $bj.text(data.entity[0].cityName).data('cityId', data.entity[0].cityId);
                                $sh.text(data.entity[1].cityName).data('cityId', data.entity[1].cityId);
                                for (var i = 2; i<data.entity.length ; i++) {
                                   $('<div><span>'+data.entity[i].cityName+'</span></div>').data('cityId', data.entity[i].cityId).appendTo('.cities');
                                };
                            }
                          }else{
                              $(".positions").hide();
                          };
                           addEventListener(comId);
                           share();
                        }else {
                            console.log(data['returnMessage']);
                        };
                    
                    },
                    error: function () {
                        console.log('error');
                    },
                });
     };
     

     //获取职位详情列表
     function getJobList(comId, cityId) {
            var baseUrl = 'http://op.chinahr.com/58group/',
            $positionItems = $(".position_items");
            $.ajax({
                    type: 'GET',
                    url: baseUrl + 'getJobList',
                    dataType:'json',
                    data: {
                      comId:comId,
                      cityId:cityId
                    },
                    success: function (data) {
                        if (data['isSuccess']) {
                          if(!!data.entity && !!data.entity.length){
                              $positionItems.empty();
                              for (var i = 0; i < data.entity.length; i++) {
                                  var jTemplate = '<div class="position_item"><div><a href="http://m.chinahr.com/job/'+data.entity[i].id+'.html?from=lhzp"><p>'+
                                  data.entity[i].name+'</p><p>'+data.entity[i].salary+'</p></div></a></div>';
                                  $positionItems.append(jTemplate);
                              };
                          };
                        }else {
                            console.log(data['returnMessage']);
                        };
                    
                    },
                    error: function () {
                        console.log('error');
                    },
                });
     };

     //页面埋点
     function trackLog(){
          var company = parseInt(location.search.slice(1,location.search.indexOf("c"))) + 1;
          window._trackURL = "{'area':'','page':'company"+company+"','channel':'other','pagetype':'mycompany','industry':'','job':'','salary':'','education':'','years':'','keywords':''}";
          var script = document.createElement('script');
          script.src = "http://tracklog.58.com/referrer_chinahr_m.js";
          document.body.appendChild(script);
     };
     trackLog();

     //IOS修补
     function fixIOS(){
          var u = navigator.userAgent,
          isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
          if(isIOS){
                $("body").css('cursor', 'pointer');
          };
     };
    fixIOS()
});