require.config({//第一块，配置
    baseUrl: '../../',
    paths: {
        jquery: 'vendor/jquery/jquery-2.1.3',
        avalon: "vendor/avalon/avalon.mobile.shim",//必须修改源码，禁用自带加载器，或直接删提AMD加载器模块
        text: 'vendor/require/text',
        domReady: 'vendor/require/domReady',
        css: 'vendor/require/css',
        aa:'test/avalon/modules/aa'
    },
    priority: ['text', 'css'],
    shim: {
        jquery: {
            exports: "jQuery"
        },
        avalon: {
            exports: "avalon"
        }
    }
});


require(["avalon","domReady!"],function(avalon){
    avalon.log("加载waf完毕");
    avalon.templateCache.empty = "";
    avalon.define({
        $id:"root",
        header:"这是根模块，用于放置其他模块都共用的东西，比如<b>用户名</b>什么的",
        html:"1111",
        footer: "页脚消息",
        page: "empty.html"
    });

    var model = avalon.define({
        $id: "test",
        firstName: "司徒",
        lastName: "正美",
        fullName: {//一个包含set或get的对象会被当成PropertyDescriptor，
            set: function(val) {//里面必须用this指向scope，不能使用scope
                var array = (val || "").split(" ");
                this.firstName = array[0] || "";
                this.lastName = array[1] || "";
            },
            get: function() {
                return this.firstName + " " + this.lastName;
            }
        },
        arr: ["aaa", 'bbb', "ccc", "ddd"],
        selected: ["bbb", "ccc"],
        checkAllbool: false,
        checkAll: function() {
            if (this.checked) {
                model.selected = model.arr
            } else {
                model.selected.clear()
            }
        }
    });
    model.checkAllbool = model.arr.length === model.selected.length;
    model.selected.$watch("length", function(n) {
        model.checkAllbool = n === model.arr.size()
    });
    avalon.scan(document.body);


    require(["aa"],function(){
        avalon.log("aa load finished!")
    });

});
