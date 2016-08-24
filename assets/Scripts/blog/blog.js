(function ($, global) {
    'use strict';
    global.gogoro = global.gogoro || {};
    global.gogoro.Blog = Blog;

    function Blog() {
        global.gogoro.common.gradientHeader();
        global.gogoro.common.socialShare();
    }
}(window.jQuery, window));
