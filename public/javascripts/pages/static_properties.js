/**
 * Created by apple on 15/12/4.
 */
jQuery(function($){
    jQuery('.save').click(function () {
        if (jQuery('#key').val() == '') {
            alert("请输入属性名");
            return false;
        }
        if (jQuery('#value').val()=='') {
            alert("请输入属性值");
            return false;
        }
        return true;
    });
});