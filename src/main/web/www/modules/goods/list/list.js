define("list", ["avalon"], function (o) {
    var cList = o.define({
        $id: "cashcouponList",
        isLoad: true,
        isEndPage: !1,
        page: 1,
        catId: 0,
        regionId: 0,
        orderby: "",
        regionList: [],
        catList: [],
        goodsList: [],
        load: function () {
            cList.page++, getData()
        },
        isRegion: !1,
        regionFun: function () {
            cList.isSortg = !1, cList.isRegion = cList.isRegion ? !1 : true, cList.regionList = o.vmodels.page.regionList
        },
        isShowAllRegion: !1,
        showRegionFun: function () {
            cList.isShowAllRegion = true
        },
        isSortg: !1,
        sortFun: function () {
            cList.isRegion = !1, cList.isSortg = cList.isSortg ? !1 : true, cList.catList = o.vmodels.page.catList
        },
        isShowAllCat: !1,
        showCatFun: function () {
            cList.isShowAllCat = true
        },
        filterFun: function (t) {
            switch (cList.isRegion = !1, cList.isSortg = !1, t) {
                case"price":
                    cList.orderby = "price_up" != cList.orderby ? "price_up" : "price_down";
                    break;
                case"new":
                    cList.orderby = "uptime_up" != cList.orderby ? "uptime_up" : "uptime_down";
                    break;
                case"region":
                    cList.regionId = o(this).data("id");
                    break;
                case"cat":
                    cList.catId = o(this).data("id");
                    break;
                default:
                    cList.orderby = ""
            }
            cList.page = 1, cList.goodsList = [], getData()
        },
        tabsTop: 0,
        isFixed: false
    });
    window.onscroll = function () {
        cList.tabsTop || (cList.tabsTop = parseInt(document.getElementById("tabs").offsetTop));
        var e = o(window).scrollTop();
        cList.isFixed = e >= cList.tabsTop ? true : false
    };
    var getData = function () {
        o.ajax && (cList.isLoad = true, o.getJSON("./modules/list.json", {}, function (o) {
            if (o) {
                o = JSON.parse(o);
                cList.goodsList = cList.goodsList.concat(o);
                var e = 1;
                cList.isEndPage = true, cList.page = 1, cList.isLoad = false
            }
        }))
    };
    getData(), o.scan(document.getElementById("main"))
});