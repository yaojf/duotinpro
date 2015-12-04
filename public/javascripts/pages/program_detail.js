jQuery(function($){
    jQuery('.delete').click(function () {
        if (confirm('是否要删除该文件')) {
            return true;
        }
        return false;
    });
});