'use strict';

var _v = "0.0.0";
require.config({
    baseUrl: './modules/',
    paths: {
        avalon: "../vendor/avalon/avalon.mobile.shim",
        domReady: '../vendor/require/domReady',
        mmPromise: "../vendor/avalon/mmPromise",
        mmRequest: "../vendor/avalon/mmRequest.modern",
        mmHistory: "../vendor/avalon/mmHistory",
        mmRouter: "../vendor/avalon/mmRouter",
        mmState: "../vendor/avalon/mmState",
        main: '../main',
        css: '../vendor/require/css',
        stateMachine: '../vendor/statemachine/state-machine',
        list: "../modules/goods/list/list",
        detail: "../modules/goods/detail/detail"
    },
    shim: {
        avalon: {
            deps: [], exports: "avalon", init: function () {
                avalon.config({loader: !1})
            }
        }
    },
    urlArgs: "_v=" + _v,
    priority: ['css'],
    config: {
        'app': {
            'basepath': '/'
        }
    },
    deps: ['./app']
});