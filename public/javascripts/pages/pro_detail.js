jQuery(function($){
    jQuery('.delete').click(function () {
        if (confirm('是否要删除该属性?')) {
            return true;
        }
        return false;
    });
});