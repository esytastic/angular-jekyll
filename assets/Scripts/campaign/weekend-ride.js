
    var main = function () {
        $('.first').click(function () {
            $(".first-route").addClass("tabHide").fadeOut(600);
            $(".third-route").addClass("tabHide").fadeOut(600);
            $(".first-route").removeClass("tabHide").fadeIn(600);
        });

        $('.second').click(function () {
            $(".first-route").addClass("tabHide").fadeOut(600);
            $(".third-route").addClass("tabHide").fadeOut(600);
            $(".second-route").removeClass("tabHide").fadeIn(600);
        });

        $('.third').click(function () {
            $(".first-route").addClass("tabHide").fadeOut(600);
            $(".second-route").addClass("tabHide").fadeOut(600);
            $(".third-route").removeClass("tabHide").fadeIn(600);
        });
    };


