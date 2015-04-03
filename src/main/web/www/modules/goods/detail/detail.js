define("detail", ["avalon"], function (n) {
    function o() {
        clearInterval(c), details.countdown > 0 && (c = setInterval(function () {
            t()
        }, 1e3))
    }

    function t() {
        var n = details.countdown -= 1e3;
        if (0 >= n)return void(details.countdownStr = "已结束");
        var o = parseInt(n / 1e3 / 60 / 60 / 24, 10), t = parseInt(n / 1e3 / 60 / 60 % 24, 10), a = parseInt(n / 1e3 / 60 % 60, 10), c = parseInt(n / 1e3 % 60, 10), u = o + "天" + t + "时" + a + "分" + c + "秒";
        details.countdownStr = "剩余" + u
    }

    var a = n.ajax, details = n.define({
        $id: "cashcouponDetail",
        cashcoupon: {name: ""},
        countdown: 0,
        countdownStr: "",
        pay: {isPay: !0, payText: "立即抢购"},
        showDetail: !1,
        payFun: function () {
            return details.pay.isPay ? void n.router.go("buy") : (console.log("不能购买"), !1)
        },
        addCartFun: function () {
            return details.pay.isPay ? void n.vmodels.cart.addGood() : (console.log("不能购买"), !1)
        },
        showDetailFun: function () {
            details.showDetail = !0
        }
    });
    details.getDetail = function () {
        a && (details.showDetail = !1, details.countdownStr = "", details.sale_count = 0, n.getJSON("./modules/detail.json", {
        }, function (n) {
            n = JSON.parse(n).data;
            details.cashcoupon = n.cashcoupon, details.cashcoupon.name = n.cashcoupon.name, details.pay.isPay = n.pay.is_pay, details.pay.payText = n.pay.pay_text, details.countdown = parseInt(n.cashcoupon.countdown), o()
        }, function (o) {
            switch (o.code) {
                case"11001":
                    app.ui.alert({
                        content: o.msg, ok: {
                            text: "查看其它", fun: function () {
                                n.router.go("home")
                            }
                        }
                    });
                    break;
                default:
                    app.ui.alert({
                        content: o.msg, ok: {
                            text: "确定", fun: function () {
                            }
                        }
                    })
            }
        }))
    };
    details.getDetail();
    var c;
    n.scan(document.getElementById("main"))
});
