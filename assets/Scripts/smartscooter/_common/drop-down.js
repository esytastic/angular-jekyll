/*
 Drop-Down
 Usage:
 # html
    <div id="dd2" class="wrapper-dropdown dropdown--default" tabindex=2">
        Now Trending
        <ul class="dropdown">
            <li><a href="#">Profile</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Log out</a></li>
        </ul>
    </div><!-- wrapper-dropdown -->

 # javascrpt 
     $(function () {
         var dd = new DropDown($('#dd'));
     });
*/
;function DropDown(el) {
    this.dd = el;
    this.initEvents();
}
DropDown.prototype = {
    initEvents: function () {
        var obj = this;

        obj.dd.on('click', function (event) {
            $(this).toggleClass('active');
            event.stopPropagation();
        });
    }
};

//var $options = $('.dropdown-field ul.options');
//$('.option-selected').on('click', function () {
//    $('.dropdown-field').toggleClass('active');
//});