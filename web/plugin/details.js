$(document).ready(function () {
    var li = '<li>{0}</li>';
    var cacheDate = null;
    $.ajax({
        type: "GET",
        url: "../json/brand.json",
        dataType: "json",
        success: function (data) {
            cacheDate = data;
            $(data).each(function (_, flag) {
                var item = " <option>" + flag.country+"</option>";
                $(item).appendTo($("#country"));
                $(flag.brand).each(function (i, n) {
                    $('<option data-tokens="' + flag.country + '-' + n.name + '">' + flag.country + '-' + n.name + '</option>').appendTo($("#all_brand"));
                })
            })
        }
    });
    var todyR = '<div class="featured-ad">'
        + '<a href= "single.html" >'
        + '<div class="featured-ad-left">'
        + '<img src="img/{0}" title="ad image" alt="" />'
        + '</div>'
        + '<div class="featured-ad-right">'
        + '<h4>{1}</h4>'
        + '<p>{2}</p>'
        + '</div>'
        + '<div class="clearfix"></div></a ></div >';
    $.ajax({
        type: "GET",
        url: "../json/recommend.json",
        dataType: "json",
        success: function (data) {
            var li = "<li >";
            $(data).each(function (_, flag) {
                if (flag.top) {
                    var item = todyR.replace("{2}", flag.price).replace("{1}", flag.remark)
                        .replace("{0}", flag.img);
                    $(item).appendTo($("#top_recommd"))
                }
            })
        }
    });
    search();
})
function search(brand, price, current) {
    var list = '<a href="single.html"><li>'
        + '<img src="img/{1}" title="" alt="" />'
        + '<section class="list-left">'
        + '<h5 class="title">{2}</h5>'
        + '<span class="adprice">{3}</span>'
        + '<p class="catpath" ><a href="#">直接购买</a></p >'
        + '</section>'
        + '<section class="list-right">'
        + '<span class="date">{4}</span>'
        + '<span class="cityname">{5}</span>'
        + '</section>'
        + '<div class="clearfix"></div></li ></a >';
    current = current || 1;
    var total = 0;
    $.ajax({
        type: "GET",
        url: "../json/list.json",
        dataType: "json",
        success: function (data) {
            var length = data.length;
            total = parseInt(data.length / 6);
            total = data.length % 6 == 0 ? total : (total + 1);
            for (var i = 0; i < total; i++) {
                if (current == (i + 1)) {
                    $('<li><a href="javascript:void(0)" onclick="search(null,null,' + (i + 1) + ')">' + (i + 1) + '</a></li>').appendTo($("#paging"));
                } else {
                    $('<li><a  href="javascript:void(0)" onclick="search(null,null,' + (i + 1) + ')">' + (i + 1) + '</a></li>').appendTo($("#paging"));
                }
            }
            var min = (current - 1)* 6;
            var max = current*6;
            $(data).each(function (_, flag) {
                if (_ >= min && _ < max) {
                    var item = list.replace("{1}", flag.img).replace("{2}", flag.remark)
                        .replace("{3}", flag.price).replace("{4}", flag.updateTime).replace("{5}", flag.form);
                    $(item).appendTo($("#more_detail"));
                }
            })
        }
    });
}