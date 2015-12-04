jQuery(function($){
    jQuery('.delete').click(function () {
        if (confirm('是否要删除该项目')) {
            return true;
        }
        return false;
    });
});