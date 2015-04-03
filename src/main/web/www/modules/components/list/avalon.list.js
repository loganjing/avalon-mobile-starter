/**
 * Created by Administrator on 2015/3/24.
 */
define(["avalon",
        "text!./avalon.list.html", //这是组件用到的VM
        "css!./avalon.list.css",
        "../draggable/avalon.draggable"],
    function(avalon, template) {

        var widget = avalon.ui.list = function(element, data, vmodels) {
            var options = data.listOptions//★★★取得配置项

            var vmodel = avalon.define(data.listId, function(vm) {
                avalon.mix(vm, options)//这视情况使用浅拷贝或深拷贝avalon.mix(true, vm, options)
                vm.$init = function() {//初始化组件的界面，最好定义此方法，让框架对它进行自动化配置
                    avalon(element).addClass("ui-list ui-widget");
                    // ★★★设置动态模板，注意模块上所有占位符都以“MS_OPTION_XXX”形式实现
                    var contentType = options.contentType === "content" ? 0 : 1
                    var Lists = template.split("MS_OPTION_CONTENT")[contentType]
                    element.innerHTML = Lists;

                    avalon.scan(element, [vmodel].concat(vmodels))
                    if(typeof vmodel.onInit === "function"){
                        vmodel.onInit.call(element, vmodel, options, vmodels)
                    }
                }

                //元素展开方法
                vm._extend = function(index, event) {
                    var isExtend =  vmodel.item[index].isExtend;
                    if(!isExtend){
                        extendLi(index,event);
                    }
                    else{
                        unExtendLi(index);
                    }

                    //具体实现

                }
                vm._moveLeft = function(index,event) {
                    //向左滑动删除
                    alert("d"+index);
                }
                vm.stopDrag = function(e, data){
                    alert("s");
                }
                vm.add = function(config) {
                    //具体实现
                }
                vm.removeLi = function(index,event) {
                    //具体实现
                    var ret=true;
                    if(typeof vmodel.beforeRemove === "function"){
                        ret= vmodel.beforeRemove.call(element,vmodel.item[index], vmodel, options, vmodels)
                    }
                    if(ret){
                        vmodel.item.removeAt(index);
                    }
                    if(typeof vmodel.afterRemove === "function"){
                        vmodel.afterRemove.call(element, vmodel.item[index],vmodel, options, vmodels)
                    }
                }
            })
            avalon.define("draggList",function(vm){
                vm.draggable={
                    stop:stopDrag,
                    drag:dragIng};
            })
            function stopDrag(e, data){
                if(data.left<-92){
                    avalon(data.element.nextElementSibling.childNodes[1]).css("left",-92);
                    avalon(data.element).css("left",-92);
                }else{
                    avalon(data.element.nextElementSibling.childNodes[1]).css("left",0);
                    avalon(data.element).css("left",0);
                }
            }
            function dragIng(e,data){
                if(data.left>-92){
                    avalon(data.element.nextElementSibling.childNodes[1]).css("left",data.left);
                }
                else if(data.left>0){
                    avalon(data.element).css("left",0);
                }
                else{
                    avalon(data.element.nextElementSibling.childNodes[1]).css("left",-92);
                }

            }
            function extendLi(index,event){
                vmodel.item.forEach(function(obj,index){
                    obj.isExtend=false;
                })
                vmodel.item[index].isExtend=true;
                if(typeof vmodel.afterExtend === "function"){
                    vmodel.afterExtend.call(event.target,index, vmodel, options, vmodels)
                }
            }
            function unExtendLi(index){
                vmodel.item[index].isExtend=false;
            }
            return vmodel//必须返回组件VM
        }
        widget.defaults = {//默认配置项
            allExtend: false,
            active: 0, //默认展开第几个列表
            event: "click", //切换面板的事件，移过(mouseenter)还是点击(click)
            afterExtend:null, // 展开List-content后触发的回调
            ListType: "Accordion" //默认手风琴
        }
        return avalon
    })
