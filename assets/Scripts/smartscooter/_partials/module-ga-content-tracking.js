angular.module('gogoro.partial.GaContentTracking', [])
.service('GATrackingService', function() {
        // Debug flag
        var debugMode = false;
        var $rootEl,$rootId;
        var gaConfig;
        var idContainer = [];
        // Get some information about the current page
        var pageTitle = document.title;

        // The Four Event Tracking values
        // ga('send', 'event', 'Category', 'Action', 'Label', Value);
        var gaCategory = '';// (String) Typically the object that was interacted with (e.g. button)
        var gaAction   = '';// (String) The type of interaction (e.g. click)
        var gaLabel    = '';// (String) Useful for categorizing events (e.g. nav buttons)
        var gaValue    = '';// (Number) Values must be non-negative. Useful to pass counts (e.g. 4 times)

        this.init = function(configs){
            gaConfig = configs;
            $rootId = gaConfig['id'];

            // Get the root id
            $rootEl = $('#'+gaConfig['id']);

            // Check if id exist
            if( $rootEl.length > 0 ) {
                // ga: page load
                if (debugMode === false) {
                    ga('send', 'event', $rootId, ' PageLoaded');
                } else {
                    console.log($rootId + ' page loaded');
                }

                //
                // console.log( scrollSceneAttached );
                if(jQuery.inArray($rootId, idContainer) != -1){

                }else{
                    // not in array
                    this._switcher($rootId);
                    idContainer.push($rootId);
                }

            }else{
                console.log("The ID of " + $rootId + ' was not exist!!!');
            }
        };

        this._switcher = function(id){
            switch(id) {
                case 'faster':
                    this._trackingFaster(id);
                    break;
                case 'smarter':
                    this._trackingSmarter(id);
                    break;
                case 'easier':
                    this._trackingEasier(id);
                    break;
                case 'customize':
                    this._trackingCustomize(id);
                    break;
            }
        };

        this._trackingFaster = function(id){
            var category = id;
            var actions  = {scrolling:'scrolling',play:'play'};
            var sections = [
                {class:'.module-faster-0-site-intro',category:category,action:actions['scrolling'],label:'site-intro'},
                {class:'.module-faster-1-page-intro',category:category,action:actions['scrolling'],label:'page-intro'},
                {class:'.module-faster-2-clean-video',category:category,action:actions['scrolling'],label:'clean-video'},
                {class:'.module-faster-3-summary-info',category:category,action:actions['scrolling'],label:'summary-info'},
                {class:'.module-faster-4-performance-hero',category:category,action:actions['scrolling'],label:'performance-hero'},
                {class:'.module-faster-5-powertrain',category:category,action:actions['scrolling'],label:'powertrain'},
                {class:'.module-faster-7-comparison-infographic',category:category,action:actions['scrolling'],label:'comparison-infographic'},
                {class:'.module-faster-8-control-hero',category:category,action:actions['scrolling'],label:'control-hero'},
                {class:'.module-faster-9-chassis',category:category,action:actions['scrolling'],label:'chassis'},
                {class:'.module-faster-10-suspension',category:category,action:actions['scrolling'],label:'suspension'},
                {class:'.module-faster-11-compound-tire',category:category,action:actions['scrolling'],label:'compound-tire'},
                {class:'.module-faster-12-13-balance-lean-angle',category:category,action:actions['scrolling'],label:'balance-lean-angle'},
                {class:'.module-faster-14-aerodynamic-design',category:category,action:actions['scrolling'],label:'aerodynamic-design'},
                {class:'.module-faster-15-waterproof',category:category,action:actions['scrolling'],label:'waterproof'},
                {class:'.module-faster-16-design-ethos',category:category,action:actions['scrolling'],label:'design-ethos'}
            ];

            //
            this._buildScrollingContentTracking(sections);

        };

        this._trackingSmarter = function(id){
            var category = id;
            var actions  = {scrolling:'scrolling',play:'play'};
            var sections = [
                {class:'.module-smarter-1-page-intro',category:category,action:actions['scrolling'],label:'page-intro'},
                {class:'.module-smarter-2-clean-video',category:category,action:actions['scrolling'],label:'clean-video'},
                {class:'.module-smarter-3-summary-info',category:category,action:actions['scrolling'],label:'summary-info'},
                {class:'.module-smarter-4-ride-smart',category:category,action:actions['scrolling'],label:'ride-smart'},
                {class:'.module-smarter-4a-ride-smart',category:category,action:actions['scrolling'],label:'4a-ride-smart'},
                {class:'.module-smarter-4b-smart-mode-chart',category:category,action:actions['scrolling'],label:'smart-mode-chart'},
                {class:'.module-smarter-5-gogoro-app',category:category,action:actions['scrolling'],label:'gogoro-app'},
                {class:'.module-smarter-6-smart-battery',category:category,action:actions['scrolling'],label:'smart-battery'},
                {class:'.module-smarter-7-vm',category:category,action:actions['scrolling'],label:'vm'},
                {class:'.module-smarter-8-smart-vision',category:category,action:actions['scrolling'],label:'smart-vision'},
                {class:'.module-smarter-auto-blinker-off',category:category,action:actions['scrolling'],label:'auto-blinker-off'},
                {class:'.module-smarter-9-12-iq-system',category:category,action:actions['scrolling'],label:'iq-system'},
                {class:'.module-smarter-13-design-ethos',category:category,action:actions['scrolling'],label:'design-ethos'}

            ];

            //
            this._buildScrollingContentTracking(sections);

        };

        this._trackingEasier = function(id){
            var category = id;
            var actions  = {scrolling:'scrolling',play:'play'};
            var sections = [
                {class:'.module-easier-1-page-intro',category:category,action:actions['scrolling'],label:'page-intro'},
                {class:'.module-easier-2-clean-video',category:category,action:actions['scrolling'],label:'clean-video'},
                {class:'.module-easier-3-summary-info',category:category,action:actions['scrolling'],label:'summary-info'},
                {class:'.module-easier-4-all-you-can-ride',category:category,action:actions['scrolling'],label:'all-you-can-ride'},
                {class:'.module-easier-6-map',category:category,action:actions['scrolling'],label:'map'},
                {class:'.module-easier-7-service-hero',category:category,action:actions['scrolling'],label:'service-hero'},
                {class:'.module-easier-8-radical-simplicity',category:category,action:actions['scrolling'],label:'radical-simplicity'},
                {class:'.module-easier-8-center-lock',category:category,action:actions['scrolling'],label:'center-lock'},
                {class:'.module-easier-8-quick-fix',category:category,action:actions['scrolling'],label:'quick-fix'},
                {class:'.module-easier-10-12-network-sos-service-staff',category:category,action:actions['scrolling'],label:'network-sos-service-staff'},
                {class:'.module-easier-13-design-ethos',category:category,action:actions['scrolling'],label:'design-ethos'}
            ];

            //
            this._buildScrollingContentTracking(sections);

        };

        this._trackingCustomize = function(id){
            var category = id;
            var actions  = {scrolling:'scrolling',play:'play'};
            var sections = [
                {class:'.module-customize-1-page-intro',category:category,action:actions['scrolling'],label:'page-intro'},
                {class:'.module-customize-2-clean-video',category:category,action:actions['scrolling'],label:'clean-video'},
                {class:'.module-customize-3-summary-info',category:category,action:actions['scrolling'],label:'summary-info'},
                {class:'.module-customize-4-dashboard',category:category,action:actions['scrolling'],label:'dashboard'},
                {class:'.module-customize-5-lighting-themes',category:category,action:actions['scrolling'],label:'lighting-themes'},
                {class:'.module-customize-6-sounds-themes',category:category,action:actions['scrolling'],label:'sounds-themes'},
                {class:'.module-customize-9-design-ethos',category:category,action:actions['scrolling'],label:'design-ethos'}
            ];

            //
            this._buildScrollingContentTracking(sections);

        };

        this._buildScrollingContentTracking = function(sections){
            // loop
            angular.forEach(sections, function(section) {

                new ScrollScene({triggerElement: $(section['class']), duration:0})
                    .on("enter", function (event) {
                        if(debugMode === false){
                            ga('send', 'event', section['category'], section['action'], section['label'], 1);
                        }else{
                            console.log('****************************');
                            console.log('Category:'+section['category']);
                            console.log('Class:'+section['class']);
                            console.log('Action:'+section['action']);
                            console.log('Label:'+section['label']);
                        }
                    }).addTo(new ScrollMagic());

            });
        };

});