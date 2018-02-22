﻿$(document).ready(function () {
    var html = '<div class="col-md-2 focus-grid">'
        + '<a href= "country.html" >'
        + '<div class="focus-border">'
        + '<div class="focus-layout">'
        + '<div class="focus-image"><img width="100" height="100" src="{0}" /></div>'
        + '<h4 class="clrchg">{1}</h4>'
        + '</div>'
        + '</div></a ></div >'; 
    var top = '<div class="col-md-3 biseller-column">'
        + '<a href= "single.html" >'
        + '<img src="img/{3}" />'
        + '<span class="price">&#36; {0}</span></a >'
        + '<div class="ad-info">'
        + '<h5>{1}</h5>'
        + '<span>{2}</span></div></div >';
    $.ajax({
        type: "GET",
        url: "../json/country.json",
        dataType: "json",
        success: function (data) {
            $(data).each(function (_, flag) {
                var item = html.replace("{0}", flag.icon).replace("{1}", flag.name);
                $(item).appendTo($("#container"));
            })
        }
    });
    $.ajax({
        type: "GET",
        url: "../json/recommend.json",
        dataType: "json",
        success: function (data) {
            var li = "<li >";
            $(data).each(function (_, flag) {
                debugger
                var item = top.replace("{0}", flag.price).replace("{1}", flag.remark)
                    .replace("{2}", flag.updateTime).replace("{3}", flag.img);
                if (_ % 4 == 0) {
                    $(li+"</li>").appendTo($("#flexiselDemo3"));
                    li = "<li >";
                }
                li = li + item;
            })

            $("#flexiselDemo3").flexisel({
                visibleItems: 1,
                animationSpeed: 1000,
                autoPlay: true,
                autoPlaySpeed: 5000,
                pauseOnHover: true,
                enableResponsiveBreakpoints: true,
                responsiveBreakpoints: {
                    portrait: {
                        changePoint: 480,
                        visibleItems: 1
                    },
                    landscape: {
                        changePoint: 640,
                        visibleItems: 1
                    },
                    tablet: {
                        changePoint: 768,
                        visibleItems: 1
                    }
                }
            });
        }
    });
})