/**
 * Created by RD_bjjlg on 2015/4/10.
 */
define(["avalon","text!./aa.html"],function(avalon,html){
    avalon.templateCache.aa = html;
    avalon.define({
        $id:"aa",
        username:"荆龙刚"
    });
    avalon.vmodels.root.page = "aa";
});