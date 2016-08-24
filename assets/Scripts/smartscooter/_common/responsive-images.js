(function($, global) {
  'use strict';

  global.gogoro = global.gogoro || {};
  global.gogoro.common = global.gogoro.common || {};
  global.gogoro.common.ResponsiveImages = ResponsiveImages;

  function ResponsiveImages() {
    imgix.onready(function() {
      imgix.fluid();
    });
  }

}(window.jQuery, window));
