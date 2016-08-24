/* global $:false, TweenMax:false, Linear:false, Cubic:false, TimelineMax:false, ScrollMagic:false, ScrollScene:false */

angular.module('gogoro.partial.modulePageIntro', [])
.service('ModulePageIntroService', function() {
    this.createElementFadeInTween = function($element, duration, delay, properties) {
        var toProperties = {
            opacity: 1,

            delay: delay,
            repeat: 0,					
            immediateRender: true,
            ease: Linear.easeNone
        };

        var tween = TweenMax.fromTo($element, duration, { opacity: 0 }, $.extend(toProperties, properties));

        return tween;
    };

    this.createElementFadeOutTween = function($element, duration, delay, properties) {
        var toProperties = {
            opacity: 0,

            delay: delay,
            repeat: 0,					
            immediateRender: false,
            ease: Linear.easeNone
        };

        var tween = TweenMax.to($element, duration, $.extend(toProperties, properties));

        return tween;
    };
    
    this.createTitleFadeInTween = function($element, callback) {
        var $el = $($element);
        var duration = 0.75;
        var delay = 0.5;

        return this.createElementFadeInTween($el, duration, delay, {
            onComplete: callback
        });
    };
    
    this.createTitleStaggeredFadeTween = function($element, callback) {
        var that = this;
    
        var $el = $($element).find('.title-wrapper tspan');
        var duration = 0.5;
        var delay = 0.5;

        var timeline = new TimelineMax();
    
        var callbackWrapper = {
            onComplete: callback
        };
    
        $el.each(function(i, $tspanEl) {
            // only call our callback at the end
        
            timeline.add(that.createElementFadeInTween($tspanEl, 
                duration, 
                delay, 
                (i === $el.length - 1) ? callbackWrapper : null));
        });

        return timeline;
    };

    this.createBodyFadeInTween = function($element, callback, additionalDelay) {
        if (additionalDelay === undefined) additionalDelay = 2;
    
        var $el = $($element);
        var $bodyEl = $el.find('.body');

        var opacityDuration = 0.45 * 2;
        var slideDuration = 0.3 * 2;
    
        var opacityDelay = 0.225 + additionalDelay;
        var slideDelay = 0.15 + additionalDelay;
    
        var opacityTween = TweenMax.fromTo($bodyEl, opacityDuration, { opacity: 0 },
            {
                opacity: 1,
        
                delay: opacityDelay,
                repeat: 0,					
                immediateRender: true,
                ease: Cubic.easeIn,
            }
        );
    
        var bottomTween = TweenMax.fromTo($bodyEl, slideDuration, { bottom: 0 },
            {
                // hardcode - sanity check
                bottom: '74px', //$bodyEl.css('bottom'), 
                
                delay: slideDelay,
                repeat: 0,					
                immediateRender: true,
                ease: Linear.easeOut,
                onComplete: function() {
                    if (callback) callback();
                }
            }
        );
    
        var timeline = new TimelineMax();
        timeline.insert(opacityTween).insert(bottomTween);

        return timeline;
    };
});