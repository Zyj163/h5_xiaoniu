/**
 * Created by ddn on 16/7/27.
 */
/**
 * Created by Elvis on 2015/11/12 0012.
 */

var banneridx = 1;
var bannertimer;


$(function () {

    //载入pie
    $('.rounded').each(function() {
        PIE.attach(this);
    });


    //banner轮播
    bannertimer = setInterval(function () {
        changebanner(banneridx,1);
    }, 5000);

    //鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
    $(".oneli").hover(function () {
        clearInterval(bannertimer);
    }, function () {
        bannertimer = setInterval(function () {
            changebanner(banneridx,1);
        }, 5000);

    });


    //自适应屏幕高度
    $("section").each(function () {
        $(this).css("height", $(window).height());
    });

    //默认滚动到1
    scrollpage(1);

    //右侧页面导航
    $(".ullist").on("click", "li", function () {
        var idx = $(this).attr("class").charAt($(this).attr("class").length - 1);
        scrollpage(idx);
    });

    $(".list-inline").on("click", "li", function() {
        var ele = $(this).find("a");
        var idx = ele.attr("class").charAt(ele.attr("class").length - 1);
        scrollpage(idx);
    });

    //关闭弹出层
    $(".showclose").on("click", function () {
        $(".divshow input").val("");
        $('.pteltip').html("");
        $(".divshow").fadeOut();

    });



    $('#sc3 > img').bind('swipeup', function() {
        alert("...");
        var page = findcurrentpage();
        if (page < 6) {
            scrollpage(page + 1);
        }
    });

    $('#sc3 > img').bind('swipedown', function() {
        alert("...");
        var page = findcurrentpage();
        if (page > 2) {
            scrollpage(page - 1);
        }
    })
});

//banner轮播函数
//idx banner序号
//flag 是否为点击 0点击跳转 1自动轮播
function changebanner(idx,flag) {
    if (flag == 0) {
        if (banneridx != idx) {
            $("#imgb" + banneridx).fadeOut(1000);
            banneridx = idx;
            $("#imgb" + banneridx).fadeIn(1000);
        }

    } else {
        $("#imgb" + banneridx).fadeOut(1000);
        banneridx++;
        if (banneridx > 3) {
            banneridx = 1;
        }

        $("#imgb" + banneridx).fadeIn(1000);
    }
    $(".oneli").removeClass("hactive");
    $("#oneli"+banneridx).addClass("hactive");
    switch (parseInt(banneridx)) {
        case 1:
            $(".p1").html("免费仓储 <span style='margin-left:2%'>无忧发货");
            $(".p2").html("Get free storage and smart delivery");
            break;
        case 2:
            $(".p1").html("保税直邮 <span style='margin-left:2%'>任君选择");
            $(".p2").html("Choose all-powerful business model");
            break;
        case 3:
            $(".p1").html("海量商品 <span style='margin-left:2%'>正品货源");
            $(".p2").html("Enjoy massive qualified products");
            break;
    }

}

//页面跳转函数
//idx 跳至页数
function scrollpage(idx) {

    $(".ullist li").css("color", "rgba(255,255,255,0.4)");
    $(".ullist .li" + idx).css("color", "rgba(255,255,255,1)");

    var normal_a = $(".list-inline li a");
    normal_a.css("color", "blue");
    normal_a.parent().attr("class", "");

    var selected_a = $(".list-inline li a.li" + idx);
    selected_a.css("color", "green");
    selected_a.parent().attr("class", "active");

    var anh = $(".sc" + idx).offset().top;
    $("html,body").stop().animate({scrollTop: anh}, 1000);
}

function findcurrentpage() {
    var lis = $(".list-inline li");
    for (var i=0; i<lis.length; i++) {
        if (lis[i].attr("class") == "active") {
            var chs = lis[i].find("a").attr("class");
            return chs.charAt(chs.length - 1);
        }
    }
}

window.onresize = function () {
    $("section").each(function () {
        $(this).css("height", $(window).height());
    });
};

//鼠标滚动事件
function wheel(event) {
    window.removeEventListener('DOMMouseScroll', wheel, false);
    var delta = 0;
    if (!event) event = window.event;
    if (event.wheelDelta) {
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta;
    } else if (event.detail) {
        delta = -event.detail / 3;
    }

    //根据鼠标滚动方向 计算
    var anh = $(window).scrollTop();
    var cheight = $(window).height();
    var idx = 1;
    if (anh >= cheight && anh < cheight * 2) {
        idx = 2;
    } else if (anh >= cheight * 2 && anh < cheight * 3) {
        idx = 3;
    } else if (anh >= cheight * 3 && anh < cheight * 4) {
        idx = 4;
    } else if (anh >= cheight * 4 && anh < cheight * 5) {
        idx = 5;
    } else if (anh >= cheight * 5 && anh < cheight * 6) {
        idx = 6;
    }

    if (delta > 0) {
        idx = idx > 1 ? (idx - 1) : idx;
    } else {
        idx = idx < 6 ? (idx + 1) : idx;
    }
    scrollpage(idx);
    setTimeout(function () {
        if (window.addEventListener) {
            window.addEventListener('DOMMouseScroll', wheel, false);
            window.onmousewheel = document.onmousewheel = wheel;
        }
    },1100);
}

if (window.addEventListener) {
    window.addEventListener('DOMMouseScroll', wheel, false);
    window.onmousewheel = document.onmousewheel = wheel;
}