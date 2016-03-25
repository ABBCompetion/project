/**
 * Created by 58 on 2016/3/12 0012.
 */
var WWQ = {
    component: {
        backTop: $('.backTop'),
        main: $('.main'),
        loadingArea: $('.loadingArea'),
        sessionName: $('.head .title .name')
    },

    val: {
        noData: false,
        size: 10,
        type: window.location.href.split('type=')[1] ? window.location.href.split('type=')[1].split(/#|&/)[0] : 'rd',
        loading: false,
        page: 0

    },
    static: {
        winHeight: $(window).height(),
        winWidth: $(window).width(),
        sessionNames: {
            rd: '研发攻城狮',
            qa: '测试攻城狮',
            po: '万能运营喵',
            pm: '无敌产品汪',
            ui: '颜控射击湿',
            ue: '交互射击湿',
            mk: 'marketing大神',
            pr: '品牌公关',
            sk: '销售之王',
            boss: '高管接班人',
            ad: '职能类'
        },
        jobs: ['rd', 'qa', 'po', 'pm', 'ui', 'ue', 'mk', 'pr', 'sk', 'boss', 'ad']

    },
    controller: {
        initBackTop: function () {
            WWQ.component.backTop.click(function () {
                window.scrollTo(0, 0)
            })
        },
        addScrollListener: function () {
            var body = $('body');
            $(window).on('scroll', function (e) {
                e.preventDefault();
                var scrollTop = body[0].scrollTop;

                {
                    if (scrollTop > WWQ.static.winHeight) {
                        WWQ.component.backTop.show();
                        WWQ.controller.initBackTop();
                    }
                    else {
                        WWQ.component.backTop.hide();

                    }
                }
                {
                    if (!WWQ.val.noData && !WWQ.val.loading) {
                        if ($('body').height() - scrollTop - WWQ.static.winHeight < WWQ.static.winHeight) {
                            WWQ.controller.getData();
                        }
                    }
                }
            })
        },
        getData: function () {
            WWQ.val.loading = true;
            $.ajax({
                type: 'GET',
                url:  'http://op.chinahr.com/58group/getJobListByType',
                dataType: 'json', 
                data: {
                    page: ++WWQ.val.page,
                    size: WWQ.val.size,
                    type: WWQ.val.type
                },
                success: function (data) {
                    if (data['isSuccess']) {
                        var jobList = data['entity'],
                            lenght = jobList.length,
                            str = '';
                        if (lenght === 0) {
                            WWQ.val.noData = true;
                            WWQ.component.loadingArea.remove();
                            return;
                        }
                        for (var i = 0; i < lenght; i++) {
                            var cityName = ''
                            if (jobList[i]['cityName']) {
                                cityName = jobList[i]['cityName']
                            }
                            var imgStr ='';

                            if(jobList[i]['logo']){
                                imgStr = "http://imgs.chinahr.com/images/photo/"+ jobList[i]['logo'] ;
                            }
                            else{
                                imgStr = 'http://static.chinahr.com/themes/op/m/58group/img/imgError.jpg';
                            }
                            str += '<a href="http://m.chinahr.com/job/' + jobList[i]['jobid'] + '.html?from=lhzp" class="item page' + WWQ.val.page + '" data-jobId="' + jobList[i]['jobid'] + '"><div class="logoArea"><img src="'+imgStr+'" alt=""/></div><div class="rightArea"><div class="line1"><div class="comName">' + jobList[i]['comName'] + '</div><div class="position"  >' + cityName + '</div></div><div class="line2 jobName">' + jobList[i]['jobName'] + '</div><div class="line3 salary">' + jobList[i]['salary'] + '</div></div></a>'
                        }
                        $(str).insertBefore(WWQ.component.loadingArea);
                        $('img', $('.main .page' + WWQ.val.page + '')).each(function (e) {
                            $(this).error(function () {
                                $(this).attr('src', 'http://static.chinahr.com/themes/op/m/58group/img/imgError.jpg')
                            })
                        });
                        if (lenght < 10) {
                            WWQ.val.noData = true;
                            WWQ.component.loadingArea.remove();
                        };
                    }
                    else {
                        WWQ.val.noData = true;
                        WWQ.component.loadingArea.remove();
                    }
                    WWQ.val.loading = false;

                },
                error: function () {
                    WWQ.val.noData = true;
                    WWQ.val.loading = false;
                    WWQ.component.loadingArea.remove();
                },
            });
        },
        initTrackLog: function () {
            window._trackURL = "{'area':'','page':'post" + (WWQ.static.jobs.indexOf(WWQ.val.type)+1 )+ "','channel':'other','pagetype':'list','industry':'','job':'','salary':'','education':'','years':'','keywords':''}";
            var script = document.createElement('script');
            script.src = "http://tracklog.58.com/referrer_chinahr_m.js";
            document.body.appendChild(script);
        }
    }
};

$(function () {
    WWQ.controller.addScrollListener();
    $(window).trigger('scroll');
    !function () {
        var i = 0,
            str = ['加载中', '加载中.', '加载中..', '加载中...'];
        !function setLoadingEffect() {
            i = (i === 3) ? 0 : (i + 1);
            WWQ.component.loadingArea.text(str[i]);
            setTimeout(arguments.callee, 200);
        }();
    }();
    WWQ.component.sessionName.text(WWQ.static.sessionNames[WWQ.val.type]);
    WWQ.controller.initTrackLog();
    var share = wechatShare();
    $('.bottom').click(function () {
        share.popShow();
    });
});
