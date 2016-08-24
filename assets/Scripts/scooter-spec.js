(function ($, global) {
    'use strict';

    global.gogoro = global.gogoro || {};
    global.gogoro.Specs = Specs;

    function Specs() {

        heightAdjustment();

        $(window).resize(function () {
            heightAdjustment();
        });

    }

    /**********************
      Private Functions
    ***********************/
    function heightAdjustment() {
        var $self = $('.smart-scooter-specs');
        var specsTitle = $self.find('.specs-title');
        var $hiddenXs = $self.find('.hidden-xs');
        var $specsName = $self.find('.specs-name');
        var $specsDesc = $self.find('.specs-desc');

        var i = 0;
        $specsName.each(function () {
            $specsDesc.eq(i).css('height', '100%');
            $specsName.eq(i).css('height', '100%');
            var iHeight = 0;
            var nameHeight = $specsName.eq(i).height();
            var descHeight = $specsDesc.eq(i).height();

            if (nameHeight > descHeight) {
                iHeight = nameHeight;
                //$specsName.eq(i).css('background-color', 'red');//TEST
            } else if (nameHeight <= descHeight) {
                iHeight = descHeight;
                //$specsName.eq(i).css('background-color', 'yellow');//TEST
                
            } else {
                iHeight = descHeight;
                //$specsName.eq(i).css('background-color', 'blue');//TEST
                //$specsDesc.eq(i).css('background-color', 'green');//TEST
            }
            
            $specsName.eq(i).css('height', iHeight);
            $specsDesc.eq(i).css('height', iHeight);

            console.log(nameHeight + ' - ' + descHeight);
            if (nameHeight > 40 || descHeight > 40) {
                $specsName.eq(i).css('margin-bottom', '20px');
                $specsDesc.eq(i).css('margin-bottom', '20px');
            } else {
                $specsName.eq(i).css('margin-bottom', '0px');
                $specsDesc.eq(i).css('margin-bottom', '0px');
            }

            i++;
        });
        //console.log('i: ' + i);
        //console.log('Totoal: ' + $specsName.length);
    }

}(window.jQuery, window));

