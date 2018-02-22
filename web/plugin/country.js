$(document).ready(function () {
    var li = '<li>{0}</li>';
    var top = ' <div>< div class="category" >'
        + '<div class="category-img">'
        + '<img src="images/cat1.png" title="image" alt="" /></div>'
        + '<div class="category-info">'
        + '<h4>{0}</h4>'
        + '<span>{1} 个品牌</span>'
        + '</div>'
        + '<div class="clearfix"></div>'
        + '</div >'
        + '<div class="sub-categories">'
        + '<ul>{2}'
        + '<div class="clearfix"></div>'
        + '</ul>'
        +'</div></div >';
    $.ajax({
        type: "GET",
        url: "../json/brand.json",
        dataType: "json",
        success: function (data) {
            $(data).each(function (_, flag) {
                var item = li.replace("{1}", flag.country);
                $(item).appendTo($("#resp-tabs-list"));
                var topitem = top.replace("{0}", flag.country);
                topitem = topitem.replace("{1}", flag.brand.length);
                var lis = "";
                $(flag.brand).each(function (i,n) {
                    lis = lis + '<li><a href="mobiles.html">' + n.name+'</a></li>' ;
                })
                topitem = topitem.replace("{2}", lis);
                $(topitem).appendTo($("#resp-tabs"));
            })
        }
    });
})