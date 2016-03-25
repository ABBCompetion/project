/**
 * @date:2016/03/13
 * @author:Adam
 */
$(function() {
      //首页轮播
	function mySwiper(){
		var mySwiper = new Swiper ('.swiper-container', {
	      		loop: true,
	      		effect: 'cube',
	      		grabCursor: true,
	      		cube: {
	      		    shadow: false,
	      		    slideShadows: false,
	      		    shadowOffset: 20,
	      		    shadowScale: 0.94
	      		},
			centeredSlides: true,
			autoplay: 2000,
	   	 });
		return mySwiper;
	};
	
      //首页悬浮组件
   	 function toTop(){
   	 	var toTop = $(".toTop"),h = $(window).height() / 5,navTop = $(".nav").offset().top;
   		$(window).on('scroll', function(event) {
   			var t = document.documentElement.scrollTop || document.body.scrollTop;
                        	if(t>h){
                        		toTop.show();
                        	}else{
                        		toTop.hide();
                        	};
                              if(navTop+15<t){
                                    $("#top").show();
                                    $(".nav>div").hide();
                              }else{
                                    $("#top").hide();
                                     $(".nav>div").show();
                              };
                              lazyLoad();
                 	 });

   	 };

      //图片懒加载
      function lazyLoad(){
          $("div.content img[data-num]").each(function() {
                var $this = $(this),$src = $this.attr("src"), value = $src.slice(0,$src.lastIndexOf('/')+1),
                myPos = $this.offset().top,winHei = $(window).height(),sroTop = $(window).scrollTop();
                if(myPos <= winHei + sroTop){
                    $this.attr('src', value + $this.attr('data-num')).removeAttr('data-num');
                };
          });
      };
   	 
      //渲染公司数据
   	 function getData(){
   	 	var baseUrl = 'http://op.chinahr.com/58group/';
   	 	$.ajax({
   	 	        type: 'GET',
   	 	        url: baseUrl + 'getCorpCardList',
                    dataType: 'json',
   	 	        success: function (data) {
   	 	            if (data['isSuccess']) {
                                 if(!!data["entity"] && !!data["entity"].length){
                    	 	                var entitiy = data['entity'],
                                                length = entitiy.length,
                                                length_ = Math.floor(length / 2),
                    	 	                details = $(".details"),
                                                remainder = length % 2;
                                                if(remainder === 0){
                          	 	                for (var i = 0; i <length_; i++) {
                          	 	                	var template = '<ul><li><div class="title">'+entitiy[2*i]["tagName"]+
                       		                        '</div><div><a onClick="clickLog(\'from=chr_58lianhe_home_com'+(2*i+1)+'\');" href="http://op.chinahr.com/58group/companydetail?'+(2*i)+'comid='+entitiy[2*i]["comId"]+' ">'+
                       		                           '<img src="http://static.chinahr.com/themes/op/m/58group/img/logo/'+entitiy[2*i]["comId"]+'.jpg" alt=""></a></div><div>'+
                       		                            '<em>'+entitiy[2*i]["jobs"]+' </em>个在招职位</div></li>'+
                       		                      '<li><div class="title">'+entitiy[2*i+1]["tagName"]+
                       		                        '</div><div><a onClick="clickLog(\'from=chr_58lianhe_home_com'+(2*i+2)+'\');" href="http://op.chinahr.com/58group/companydetail?'+(2*i+1)+'comid='+entitiy[2*i+1]["comId"]+' ">'+
                       		                           '<img src="http://static.chinahr.com/themes/op/m/58group/img/logo/'+entitiy[2*i+1]["comId"]+'.jpg" alt=""></a></div><div>'+
                       		                            '<em>'+entitiy[2*i+1]["jobs"]+' </em>个在招职位</div></li></ul>';
                       		                       details.append(template);
                    	 	                      };
                                                }else{
                                                        if(length===1){
                                                            var template =  '<ul><li><div class="title">'+entitiy[length-1]["tagName"]+
                                                                 '</div><div><a onClick="clickLog(\'from=chr_58lianhe_home_com'+length+'\');" href="http://op.chinahr.com/58group/companydetail?'+(length-1)+'comid='+entitiy[length-1]["comId"]+' ">'+
                                                                 '<img src="http://static.chinahr.com/themes/op/m/58group/img/logo/'+entitiy[length-1]["comId"]+'.jpg" alt=""></a></div><div>'+
                                                                  '<em>'+entitiy[length-1]["jobs"]+' </em>个在招职位</div></li></ul>';
                                                            details.append(template);
                                                        }else{
                                                           for (var i = 0; i <length_; i++) {
                                                                var template = '<ul><li><div class="title">'+entitiy[2*i]["tagName"]+
                                                                 '</div><div><a onClick="clickLog(\'from=chr_58lianhe_home_com'+(2*i+1)+'\');" href="http://op.chinahr.com/58group/companydetail?'+(2*i)+'comid='+entitiy[2*i]["comId"]+' ">'+
                                                                 '<img src="http://static.chinahr.com/themes/op/m/58group/img/logo/'+entitiy[2*i]["comId"]+'.jpg" alt=""></a></div><div>'+
                                                                  '<em>'+entitiy[2*i]["jobs"]+' </em>个在招职位</div></li>'+
                                                                 '<li><div class="title">'+entitiy[2*i+1]["tagName"]+
                                                                 '</div><div><a onClick="clickLog(\'from=chr_58lianhe_home_com'+(2*i+2)+'\');" href="http://op.chinahr.com/58group/companydetail?'+(2*i+1)+'comid='+entitiy[2*i+1]["comId"]+' ">'+
                                                                  '<img src="http://static.chinahr.com/themes/op/m/58group/img/logo/'+entitiy[2*i+1]["comId"]+'.jpg" alt=""></a></div><div>'+
                                                                 '<em>'+entitiy[2*i+1]["jobs"]+' </em>个在招职位</div></li></ul>';
                                                                   details.append(template);
                                                            };
                                                            template =  '<ul><li><div class="title">'+entitiy[length-1]["tagName"]+
                                                                 '</div><div><a onClick="clickLog(\'from=chr_58lianhe_home_com'+length+'\');" href="http://op.chinahr.com/58group/companydetail?'+(length-1)+'comid='+entitiy[length-1]["comId"]+' ">'+
                                                                 '<img src="http://static.chinahr.com/themes/op/m/58group/img/logo/'+entitiy[length-1]["comId"]+'.jpg" alt=""></a></div><div>'+
                                                                  '<em>'+entitiy[length-1]["jobs"]+' </em>个在招职位</div></li></ul>';
                                                                  details.append(template);
                                                        };
                                                };
                                                    $('.details img').each(function (e) {
                                                        $(this).on('error', function(event) {
                                                            $(this).attr('src','http://static.chinahr.com/themes/op/m/58group/img/imgError.jpg');
                                                        });
                                                    });
                                                    mySwiper();
                                                    toTop();
                                                    trackLog();
                                                    share();
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
   	 getData();

      //分享功能实现
   	 function share(){
   	 	var share = wechatShare();
   	 	$("#share").on('click', function(event) {
   	 		share.popShow();
   	 	});
   	 	$(".sharePop").css('z-index', 1000);
   	 };
   	 

     //页面埋点
     function trackLog(){
          window._trackURL = "{'area':'','page':'home','channel':'other','pagetype':'home','industry':'','job':'','salary':'','education':'','years':'','keywords':''}";
          var script = document.createElement('script');
          script.src = "http://tracklog.58.com/referrer_chinahr_m.js";
          document.body.appendChild(script);
     };
     
});