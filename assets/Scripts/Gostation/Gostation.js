


$('#find-gostation').on('click', function (e) {
    e.preventDefault();

    $('html, body').animate({
        scrollTop: $('#nearbyGoStations').offset().top
    }, 1000);

});






var main = function () {


    $('.tab11').click(function () {
        $(".StationTab2").addClass(" tabHide").fadeOut(600);
        $(".StationTab3").addClass(" tabHide").fadeOut(600);
        $(".StationTab1").removeClass(" tabHide").fadeIn(600);

    });


    $('.tab22').click(function () {
        $(".StationTab1").addClass(" tabHide").fadeOut(600);
        $(".StationTab3").addClass(" tabHide").fadeOut(600);
        $(".StationTab2").removeClass(" tabHide").fadeIn(600);
    });


    $('.tab33').click(function () {
        $(".StationTab1").addClass(" tabHide").fadeOut(600);
        $(".StationTab2").addClass(" tabHide").fadeOut(600);
        $(".StationTab3").removeClass(" tabHide").fadeIn(600);
    });






};














///*popup*/

//settings = {
//    //Model Popup
//    objModalPopupBtn: ".modalButton",
//    objModalCloseBtn: ".overlay, .closeBtn",
//    objModalDataAttr: "data-popup"
//}
//$(settings.objModalPopupBtn).bind("click", function () {
//    if ($(this).attr(settings.objModalDataAttr)) {
//        $("body").addClass("bodyAddClass");
//        var strDataPopupName = $(this).attr(settings.objModalDataAttr);
//        processAjaxData("Gogoro - Introducing the world's first and only Smartscooter™", '?hash=' + $(this).data("popup"));

//        //Fade In Modal Pop Up
//        $(".overlay, #" + strDataPopupName).fadeIn();
//        return false;
//    }
//});

//var vid = document.getElementById("FaqPlusVedio");
//$(".Faq_GogoroPlus").bind("click", function () {

//    vid.autoplay = true;
//    vid.load();
//});

//var vid2 = document.getElementById("FaqSwapVedio");
//$(".Faq_Swap").bind("click", function () {

//    vid2.autoplay = true;
//    vid2.load();
//});



////On clicking the modal background
//$(settings.objModalCloseBtn).bind("click", function () {
//    $(".modal").fadeOut();
//    $("body").removeClass("bodyAddClass");
//    processAjaxData("Gogoro - Introducing the world's first and only Smartscooter™", 'gostation');
//});
//$(function () {
//    $("a[data-popup=" + getUrlParam("hash") + "]").trigger("click");
//})
//function processAjaxData(response, urlPath) {
//    document.title = response;
//    window.history.pushState({
//        "html": response.html,
//        "pageTitle": response
//    }, "", urlPath);
//}
//function getUrlParam(name) {
//    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//    var r = window.location.search.substr(1).match(reg);
//    if (r != null)
//        return unescape(r[2]);
//    return null;
//}



/*Arrow*/
var main = function () {

    $('.arrow-next').click(function () {
        var currentSlide = $("#" + getUrlParam("hash"));
        var nextSlide = currentSlide.next();
        if (!nextSlide.hasClass('modalWindow')) {
            nextSlide = $('.modalWindow').first();
        };
        currentSlide.fadeOut(600);
        nextSlide.fadeIn(600);
        processAjaxData("Gogoro - Introducing the world's first and only Smartscooter™", '?hash=' + nextSlide.attr("id"));

    });


    $('.arrow-prev').click(function () {
        var currentSlide = $("#" + getUrlParam("hash"));
        var prevSlide = currentSlide.prev();
        if (!prevSlide.hasClass('modalWindow')) {
            prevSlide = $('.modalWindow').last();
        };
        currentSlide.fadeOut(600);
        prevSlide.fadeIn(600);
        processAjaxData("Gogoro - Introducing the world's first and only Smartscooter™", '?hash=' + prevSlide.attr("id"));

    });


    $('.closeVedioBtn').click(function () {


        document.getElementById("FaqSwapVedio").pause();

    });

    $('.closeVedioBtnPlus').click(function () {


        document.getElementById("FaqPlusVedio").pause();

    });

};


///*popup fisnish*/


$(document).ready(main);





