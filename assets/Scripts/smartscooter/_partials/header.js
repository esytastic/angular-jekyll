/*
|--------------------------------------------------------------------------
| Slide Push Menu
|--------------------------------------------------------------------------
*/
(function ($, global) {
    'use strict';

    global.gogoro = global.gogoro || {};
    global.gogoro.partials = global.gogoro.partials || {};
    global.gogoro.partials.SlidePushMenu = SlidePushMenu;

    var gogoro = global.gogoro;

    function SlidePushMenu() {
        var self = this;

        self.$mainHeader = $('header#main-header');

        /* Gogoro SVg logo fall back
         * ==================================== */
        if (!global.Modernizr.svg) {
            $('.gogoro-logo').attr('src', '//images.gogoroapp.com/gogoro.png');
        }

        /* Display main navigation
         * ==================================== */
        $('.navbar-default-gogoro .navbar-toggle').on('click', function (e) {
            e.stopImmediatePropagation();
            e.preventDefault();
            self.toggleNav();
        });

        /* links event
        * ==================================== */
        var current_action = $('.navbar-primary').data('current-action');
        var primary_links = $('.navbar-primary a');
        var primary_spans = $('.navbar-primary span');

        primary_spans.css('display', 'none');
        primary_links.each(function (i) {
            var action_name = $(this).data('action-name');
            if (action_name == current_action) {
                $(this).css('display', 'none'); // hide link 
                primary_spans.eq(i).css('display', 'block');// show span
            }
        });

        //
        this.$body = $('body');
        this.$siteContainer = $('#site-container');
        this.$navBrand = $('.navbar-default-gogoro .navbar-brand');

    }

    SlidePushMenu.prototype.setPg = function (state) {
        var $links = $('.navbar-primary a').removeClass('active');
        $links.filter('[data-state="' + state + '"]').addClass('active');
    };

    SlidePushMenu.prototype.toggleNav = function () {

        if (this.$body.hasClass('navigation-active') && !this.$siteContainer.hasClass('velocity-animating')) {
            this.closeNav();

        } else if (!this.$siteContainer.hasClass('velocity-animating')) {
            this.openNav();
        }

    };

    SlidePushMenu.prototype.openNav = function () {
        var self = this;
        var navWidth = gogoro.App.getBreakpoint() === 'xs' ? 268 : 400;
        var transitionDuration = 220;

        //
        self.$mainHeader.css('position', 'absolute');

        // Detect when device is rotated and close menu
        $(window).on('orientationchange', function () {
            self.closeNavImmediately();
        });

        // Add navigation active, set body height to prevent scrolling
        this.$body.addClass('navigation-active').css({
            height: $(window).outerHeight()
        });

        // Set height for site container to prevent scrolling
        this.$siteContainer.css({
            height: $(window).outerHeight(),
            overflow: 'hidden',
            zIndex: 100
        });

        if (!$('#site-overlay').length) {
            // Create clickable site overlay
            $('<div>', {
                id: 'site-overlay',
                css: {
                    right: navWidth
                }
            }).appendTo('body');
            $('#site-overlay').on('touchmove', function (e) {
                e.preventDefault();
            });
        }

        // Animate toggle icon into close icon
        // Animate top bar
        $('.navbar-toggle .icon-bar:eq(0)').velocity({
            translateY: gogoro.App.getBreakpoint() === 'xs' || gogoro.App.getBreakpoint() === 'sm' ? 7 : 8
        }, {
            duration: transitionDuration / 2,
            easing: 'easeOut',
            complete: function () {
                // Fade out center bar
                $('.navbar-toggle .icon-bar:eq(1)').velocity('fadeOut', {
                    duration: transitionDuration / 4
                });
                // Rotate top bar
                $(this).velocity({
                    rotateZ: '45deg'
                }, {
                    duration: transitionDuration / 2,
                    easing: 'easeOut'
                });
            }
        });

        // Animate bottom bar
        $('.navbar-toggle .icon-bar:eq(2)').velocity({
            translateY: gogoro.App.getBreakpoint() === 'xs' || gogoro.App.getBreakpoint() === 'sm' ? -7 : -8
        }, {
            duration: transitionDuration / 2,
            easing: 'easeOut',
            complete: function () {
                $(this).velocity({
                    rotateZ: '-45deg'
                }, {
                    duration: transitionDuration / 2,
                    easing: 'easeOut'
                });
            }
        });

        // Display navbar and set top position
        $('.navbar-main').css({
            display: 'block',
            top: 0
        });

        // Set to top of scroll
        $('.navbar-main .navbar-container').scrollTop(0);

        // Stop gradient animations which prevent JS bug with Velocity
        if ($('#hero-header .gradient-one').length) {
            $('#hero-header .gradient-one, #hero-header  .gradient-two').velocity('stop');
        }

        // Push site open
        this.$siteContainer.velocity({
            translateX: -navWidth
        }, {
            duration: transitionDuration,
            easing: 'easeOut'
        });

        if (gogoro.App.getBreakpoint() === 'md' || gogoro.App.getBreakpoint() === 'lg') {
            // Keep nav brand in same position
            $('.navbar-default-gogoro .navbar-brand').velocity({
                translateX: navWidth
            }, {
                duration: transitionDuration,
                easing: 'easeOut'
            });
        }

        // Add motion to nav items
        $('.navbar-items').velocity({
            translateX: 30
        }, {
            delay: 50,
            duration: transitionDuration,
            easing: 'easeOut'
        });

        // Push fixed nav
        $('.navbar-default-gogoro.fixed').velocity({
            translateX: -navWidth
        }, {
            duration: transitionDuration,
            easing: 'easeOut'
        });

        // Bind site overlay
        $('#site-overlay').on('click', function (e) {
            e.stopImmediatePropagation();
            self.toggleNav();
        });

        // Animate in and bind close
        setTimeout(function () {
            $('.close-navbar-primary').on('click', function (e) {
                e.stopImmediatePropagation();
                e.preventDefault();
                self.closeNav();
            });
        }, transitionDuration);
    };

    SlidePushMenu.prototype.closeNav = function () {
        var self = this;
        var transitionDuration = 180;

        // Unbind orientation change
        $(window).unbind('orientationchange');

        // Pull closed
        this.$siteContainer.velocity({
            translateX: 0
        }, {
            delay: 50,
            duration: transitionDuration,
            easing: 'easeOut',
            complete: function () {
                $('.navbar-main').attr('style', '');
                // Reset and remove inline styles
                self.$siteContainer.attr('style', '');

                //
                self.$mainHeader.css('position', 'fixed');
            }
        });

        // Animate close icon into toggle icon
        // Animate top bar
        $('.navbar-toggle .icon-bar:eq(0)').velocity({
            rotateZ: '0deg'
        }, {
            duration: transitionDuration / 2,
            easing: 'easeOut',
            complete: function () {
                // Fade out center bar
                $('.navbar-toggle .icon-bar:eq(1)').velocity('fadeIn', {
                    duration: transitionDuration / 4
                });
                // Rotate top bar
                $(this).velocity({
                    translateY: 0
                }, {
                    duration: transitionDuration / 2,
                    easing: 'easeOut'
                });
            }
        });

        // Animate bottom bar
        $('.navbar-toggle .icon-bar:eq(2)').velocity({
            rotateZ: '0deg'
        }, {
            duration: transitionDuration / 2,
            easing: 'easeOut',
            complete: function () {
                $(this).velocity({
                    translateY: 0
                }, {
                    duration: transitionDuration / 2,
                    easing: 'easeOut'
                });
            }
        });

        // Pull fixed nav closed
        $('.navbar-default-gogoro.fixed').velocity({
            translateX: 0
        }, {
            delay: 50,
            duration: transitionDuration,
            easing: 'easeOut'
        });

        if (gogoro.App.getBreakpoint() === 'md' || gogoro.App.getBreakpoint() === 'lg') {
            // Keep nav brand in same position
            $('.navbar-default-gogoro .navbar-brand').velocity({
                translateX: 0
            }, {
                delay: 50,
                duration: transitionDuration,
                easing: 'easeOut'
            });
        }

        // Add motion to nav items
        $('.navbar-items').velocity({
            translateX: -30
        }, {
            duration: transitionDuration,
            easing: 'easeOut'
        });

        // Remove navigation active
        this.$body.removeClass('navigation-active').css({
            height: 'auto'
        });

        // Remove clickable overlay
        $('#site-overlay').remove();

        // Animate in and unbind close
        $('.close-navbar-primary').unbind();

    };

    SlidePushMenu.prototype.closeNavImmediately = function () {
        var self = this;

        // Unbind orientation change
        $(window).unbind('orientationchange');

        // Reset site container
        this.$siteContainer.velocity({
            translateX: 0
        }, {
            duration: 0,
            complete: function () {
                $('.navbar-main').attr('style', '');
                // Reset and remove inline styles
                self.$siteContainer.attr('style', '');
            }
        });

        // Reset fixed navbar
        $('.navbar-default-gogoro.fixed').attr('style', '');

        // Reset navbar
        $('.navbar-primary').attr('style', '');

        if (gogoro.App.getBreakpoint() === 'md' || gogoro.App.getBreakpoint() === 'lg') {
            // Reset navbar brand
            $('.navbar-default-gogoro .navbar-brand').attr('style', '');
        }

        // Reset body
        this.$body.removeClass('navigation-active').css({
            height: 'auto'
        });

        // Remove clickable overlay
        $('#site-overlay').remove();

        // Unbind close
        $('.close-navbar-primary').unbind();
    };


}(window.jQuery, window));


/*
|--------------------------------------------------------------------------
| Header
|--------------------------------------------------------------------------
*/
(function ($, global) {
    'use strict';

    global.gogoro = global.gogoro || {};
    global.gogoro.partials = global.gogoro.partials || {};
    global.gogoro.partials.Header = Header;

    var gogoro = global.gogoro;

    function Header() {
        var self = this;

        // Initial variables
        self.showConsoleLog = true;// use for showing console.log for debugging. 
        self.$SiteContainer = $('#site-container');
        self.$mainHeader = $('header#main-header');

        // Initial events
        self.init();

    }

    Header.prototype.windowResize = function () {
        var self = this;

        $(window).on('resize', function () {

            // fallback
            if (gogoro.App.currentState == 'fallback') {

                if (typeof self.$collisionRepositioneElement != 'undefined') {
                    self.$collisionRepositioneElement.css('top', 0);
                }
                $(window).off('scroll.headerscrolling');
                $(window).off('scroll.tabbar');
            }

            // standard
            if (gogoro.App.currentState == 'standard') {
                // Detect if the page has collision element
                self.detectCollisionElement();
            }
        });
    }

    Header.prototype.consoleLog = function () {
        var self = this;
        if (self.showConsoleLog == false) {
            console.log = function () { };
        }
    }

    Header.prototype.init = function () {
        var self = this;

        // onload
        if (gogoro.App.currentState == 'standard') {
            // Detect if the page has collision element
            self.detectCollisionElement();
        }

        // window resize
        self.windowResize();
    };

    Header.prototype.detectCollisionElement = function () {
        var self = this;

        /**
           to have a collision element place .collision class
           which is also the element that you will add .fixed class to it and 
           to the element which you want have attach collision event. 
        ***/
        self.hasCollisionElement = false;
        self.$collisionElement = self.$SiteContainer.find('.collision');// the element which will have .fixed class
        self.collisionElementLength = self.$collisionElement.length;

        // Check if collision element existed
        if (self.$collisionElement.length > 0) {
            self.hasCollisionElement = true;
            //
            self.$collisionRepositioneElement = self.$collisionElement.find('.collision-reposition');// the element which will push down
            self.collisionTop = self.$collisionRepositioneElement.data('position-top');// number for top
        }

        //
        if (self.hasCollisionElement) {

            if (self.$SiteContainer.find('.tabbar-container').length > 0) {
                self.mouseScrollingWithCollisiontTabbar();
            } else {
                self.mouseScrollingWithCollisionElement();
            }

        } else {
            self.mouseScrollingWithoutCollisionElement();
        }
    };

    //scroll.tabbar
    Header.prototype.mouseScrollingWithCollisiontTabbar = function () {
        var self = this;
        var tabbarContainerOffset = $('.tabbar-container').offset().top;
        var limitHeight = tabbarContainerOffset + 600;
        var st = 0;
        var lastScrollTop = 0;

        var continueStrollDownTabbarContainer = false;
        var continueScrollUpTabbarContainer = false;
        var continueScrollDown = false;
        var continueScrollUp = false;
        var headerH = $("#main-header").height();
        var introH = $(".module-page-intro").height();
        var moveminiH = introH - headerH;
        $(window).on('scroll.tabbar', function () {
            st = $(window).scrollTop();
            //if($(".module-page-intro").length)
            self.$mainHeader.css("backgroundColor", "rgba(255,255,255," + st / introH + ")").css('borderBottom', "rgba(241,243,243," + st / introH + ")");
            if (st >= moveminiH && st < introH) {

                self.$mainHeader.stop().css({ top: "-" + (st - moveminiH) + "px" });
            }
            else if (st < moveminiH) {
                self.$mainHeader.stop().css({ top: "0px" });
            }
            //console.clear();
            //add fixed class to .tabbar-container
            //the fixed class is being added from tabbar..js
            if (st >= tabbarContainerOffset) {

                continueScrollUpTabbarContainer = false;

                if (continueStrollDownTabbarContainer == false) {
                    //console.log("--------------------------------------------");
                    //console.log("continueScrollUpTabbarContainer");
                    //
                    self.$mainHeader.stop().velocity({ top: '-' + headerH + 'px' }, { duration: 0 });

                    continueStrollDownTabbarContainer = true;
                }

                if (st > limitHeight) {
                    //console.log("--------------------------------------------");
                    //console.log("st", st);
                    //console.log("continueScrollDown");

                    // up and down 
                    if (st > lastScrollTop) {
                        //console.log('Scroll DWON');
                        continueScrollUp = false;
                        var top = parseInt(self.$mainHeader.css('top'));

                        if (continueScrollDown == false) {

                            //console.log("--------------------------------------------");
                            //console.log("continueScrollDown");
                            //
                            self.$mainHeader.stop().velocity({ top: '-' + headerH + 'px' }, { duration: 400 });
                            self.$collisionRepositioneElement.stop().velocity({ top: '0' }, { duration: 400 });
                            continueScrollDown = true;
                        }

                    } else {
                        //console.clear();
                        //console.log('Scroll UP');
                        continueScrollDown = false;

                        if (continueScrollUp == false) {
                            self.$mainHeader.stop().velocity({ top: '0px' }, { duration: 400 });
                            self.$collisionRepositioneElement.stop().velocity({ top: self.collisionTop + 'px' }, { duration: 400 });
                            continueScrollUp = true;
                        }
                    }

                }

            } else {
                //console.log("--------------------------------------------");
                //console.log("continueScrollUpTabbarContainer");

                //remove fixed class to .tabbar-container
                //the fixed class is being removed from tabbar..js
                continueStrollDownTabbarContainer = false;

                if (continueScrollUpTabbarContainer == false) {
                    //console.log('remove fixed');
                    self.$mainHeader.stop();
                    continueScrollUpTabbarContainer = true;
                }

                self.$collisionRepositioneElement.css('top', 0);
            }

            lastScrollTop = st;
        });
    };

    //
    Header.prototype.mouseScrollingWithCollisionElement = function () {
        var self = this;
        // Mouse scrolling event
        var lastScrollTop = 0;
        var collisionElementOffsetTop = self.$collisionElement.offset().top;
        var continueScrollDown = false;
        var continueScrollUp = false;

        var continueScrollDownCollision = false;
        var continueScrollUpCollision = false;
        var headerH = $("#main-header").height();

        //console.log('------ scroll.headerscrolling ------');
        //console.log('self.$collisionElement', self.$collisionElement);
        //console.log('collisionElementOffsetTop', collisionElementOffsetTop);
        //
        $(window).on('scroll.headerscrolling', function () {

            var st = $(window).scrollTop();
            //console.log('st', st);

            //var hasFixed = self.$collisionElement.hasClass('fixed');
            //var hit = self.$mainHeader.collision(self.$collisionElement);

            if (st >= collisionElementOffsetTop) {
                self.$collisionRepositioneElement.addClass('fixed');

                // calculating if scrolling is up or down F1F3F3
                if (st > lastScrollTop) { // Scroll DOWN 
                    //console.log('Scroll down');
                    console.log(111);

                    continueScrollUp = false;

                    if (st > 50) {
                        if (continueScrollDown == false) {
                            self.$mainHeader.stop().velocity({ top: '-80px' }, { duration: 400 });
                            //self.$mainHeader.css('backgroundColor', 'transparent');
                            self.$collisionRepositioneElement.stop().velocity({ top: '0px' }, { duration: 400 });
                            continueScrollDown = true;
                        }
                    }

                } else { // Scroll UP 
                    //console.log('Scroll Up');

                    continueScrollDown = false;

                    if (continueScrollUp == false) {
                        self.$mainHeader.css('backgroundColor', '#FFFFFF');
                        self.$mainHeader.stop().velocity({ top: '0px' }, { duration: 400 });
                        self.$collisionRepositioneElement.velocity({ top: '80px' }, { duration: 400 });
                        continueScrollUp = true;
                    }

                }

            } else {
                if (st > lastScrollTop) {
                    self.$collisionRepositioneElement.removeClass('fixed').css('top', 0);
                    if (st < headerH)
                    { self.$mainHeader.stop().css({ top: "-" + st + "px", 'backgroundColor': 'rgba(255,255,255,' + (st - headerH) / headerH + ')' }); }
                    if (st > headerH && lastScrollTop > headerH)
                    { self.$mainHeader.stop().css({ top: -headerH, 'backgroundColor': 'rgba(255,255,255,1)' }); }
                }

            }

            lastScrollTop = st;
        });

    };

    // Mouse Scrolling Without Collision Element
    Header.prototype.mouseScrollingWithoutCollisionElement = function () {

        //console.log('Mouse Scrolling Without Collision Element');

        var self = this;
        var lastScrollTop = 0;
        var continueScrollDown = false;
        var continueScrollUp = false;
        var headerH = $("#main-header").height();
        $(window).on('scroll.headerscrolling', function () {

            var st = $(window).scrollTop();

            // calculating if scrolling is up or down
            if (st > lastScrollTop) { // Scroll DOWN
                //console.log('Scroll down');
                if (st < headerH)
                { self.$mainHeader.stop().css({ top: "-" + st + "px", 'backgroundColor': 'rgba(255,255,255,' + (st - headerH) / headerH + ')' }); }
                if (st > headerH && lastScrollTop > headerH)
                { self.$mainHeader.stop().css({ top: -headerH, 'backgroundColor': 'rgba(255,255,255,1)' }); }
                continueScrollUp = false;

                if (st > 200) {
                    if (continueScrollDown == false) {
                        self.$mainHeader.stop().velocity({ top: -headerH }, { duration: 400 });
                        continueScrollDown = true;
                    }
                }



            } else { // Scroll UP 
                //console.log('Scroll Up');
                continueScrollDown = false;
                if (st == 0)
                { self.$mainHeader.stop().css({ 'backgroundColor': 'rgba(255,255,255,' + st / headerH + ')' }); }
                if (continueScrollUp == false) {
                    self.$mainHeader.stop().velocity({ top: '0px' }, { duration: 400 });



                    continueScrollUp = true;
                }
            }

            lastScrollTop = st;

        });

    };
}(window.jQuery, window));