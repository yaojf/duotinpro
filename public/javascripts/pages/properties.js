jQuery(function ($) {
    jQuery('.delete').click(function () {
        if (confirm('是否要删除该文件')) {
            return true;
        }
        return false;
    });

    jQuery('.save').click(function () {
        if (jQuery('#title').val() == '') {
            alert("请输入文件名称");
            return false;
        }
        if (jQuery('#type').val()=='nil') {
            alert("请选择环境");
            return false;
        }
        return true;
    });


});