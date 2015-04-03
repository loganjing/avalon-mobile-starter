'use strict';

var _v = "0.0.0";
require(["avalon", "mmPromise","mmRequest","mmHistory","mmRouter", "mmState", "mmRequest"], function (avalon) {
    var t = "?_v=" + _v;

    //顶级controller
    avalon.define({$id: "root", isFooter: !0, page: ""});

    //主页面内容
    var page = avalon.define({
        $id: "page",
        header:"./modules/goods/header/header.html"
    });

    avalon.state("home", {
        controller: "page",
        url: "/",
        views: {"": {templateUrl: "./modules/goods/list/tpl.html" + t}, "title@": {template: "商品列表"}},
        onChange: function () {
            avalon.vmodels.cashcouponList || require(["list"], function() {
            })
        }
    });
    avalon.state("detail", {
        controller: "page",
        url: "/cashcoupon/{cashcouponId}",
        views: {"": {templateUrl: "./modules/goods/detail/tpl.html" + t}, "title@": {template: "商品详情"}},
        onChange: function (t) {
            avalon.vmodels.page.cashcouponId = t;
            avalon.vmodels.cashcouponDetail ? avalon.vmodels.cashcouponDetail.getDetail() : require(["detail"], function() {
            })
        }
    });

    avalon.history.start({basepath: "/mmRouter"});
    avalon.scan(document.body);
});