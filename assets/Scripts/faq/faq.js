(function ($, global) {
    'use strict';

    var settings = {
        //Model Popup
        objModalPopupBtn: ".modalButton",
        objModalCloseBtn: ".overlay, .closeBtn",
        objModalDataAttr: "data-popup"
    }

    $(settings.objModalPopupBtn).on("click", function () {
        if ($(this).attr(settings.objModalDataAttr)) {
            $("body").addClass("bodyAddClass");
            var strDataPopupName = $(this).attr(settings.objModalDataAttr);
            processAjaxData("Gogoro - Introducing the world's first and only Smartscooter™", '?hash=' + $(this).data("popup"));

            //Fade In Modal Pop Up
            $(".overlay, #" + strDataPopupName).fadeIn();
            return false;
        }
    });

    var vid = document.getElementById("FaqPlusVedio");
    $(".Faq_GogoroPlus").on("click", function () {
   
        vid.autoplay = true;
        vid.load();
    });

    var vid2 = document.getElementById("FaqSwapVedio");
    $(".Faq_Swap").on("click", function () {

        vid2.autoplay = true;
        vid2.load();
    });

    //On clicking the modal background
    $(settings.objModalCloseBtn).on("click", function () {
        $(".modal").fadeOut();
        $("body").removeClass("bodyAddClass");
        processAjaxData("Gogoro - Introducing the world's first and only Smartscooter™", 'faq');
    });

    $(function () {
        $("a[data-popup=" + getUrlParam("hash") + "]").trigger("click");
    })

    function processAjaxData(response, urlPath) {
        document.title = response;
        window.history.pushState({
            "html": response.html,
            "pageTitle": response
        }, "", urlPath);
    }

    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    }


    /*Arrow*/
    var main = function () {




        $('.arrow-next').on('click', function () {
            var currentSlide = $("#" + getUrlParam("hash"));
            var nextSlide = currentSlide.next();
            if (!nextSlide.hasClass('modalWindow')) {
                nextSlide = $('.modalWindow').first();
            };
            currentSlide.fadeOut(600);
            nextSlide.fadeIn(600);
            processAjaxData("Gogoro - Introducing the world's first and only Smartscooter™", '?hash=' + nextSlide.attr("id"));

        });

        $('.arrow-prev').on('click', function () {
            var currentSlide = $("#" + getUrlParam("hash"));
            var prevSlide = currentSlide.prev();
            if (!prevSlide.hasClass('modalWindow')) {
                prevSlide = $('.modalWindow').last();
            };
            currentSlide.fadeOut(600);
            prevSlide.fadeIn(600);
            processAjaxData("Gogoro - Introducing the world's first and only Smartscooter™", '?hash=' + prevSlide.attr("id"));

        });

        $('.closeVedioBtn').on('click', function () {
            document.getElementById("FaqSwapVedio").pause();
        });

        $('.closeVedioBtnPlus').on('click', function () {
            document.getElementById("FaqPlusVedio").pause();

        });

    };


    /*高度test*/
    /*
    $('#Faq_Sport_btn').on('click', function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $('.Faq_Sport').offset().top
        }, 0);

    });
    */

    $(document).ready(main);

}(window.jQuery, window));