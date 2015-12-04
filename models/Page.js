var Page = function(page, size) {
    this.page = page;
    this.size = size;
    this.offset = (page - 1) * size;
};