
gogoroApp.controller('moduleSmarter9IqSystemController', ["$scope", "$element", function ($scope, $element) {
        var moduleSmarter9IqSystem = {
            configure: {
                currentState: gogoro.App.getBreakpoint()
            },

            init: function() {
                var obj = this;

                obj.getState();

                $(window).on('resize', function() {
                    // Detect state change
                    if (obj.configure.currentState !== gogoro.App.getBreakpoint()) {
                        // Redefine current state
                        obj.configure.currentState = gogoro.App.getBreakpoint();

                        obj.getState();
                    }
                });
            },

            getState: function() {
                var obj = this;
                if (obj.configure.currentState === 'lg' || obj.configure.currentState === 'md') {
                    obj.fallback.destroy();
                    obj.standard.init();
                } else if (obj.configure.currentState === 'sm' || obj.configure.currentState === 'xs') {
                    obj.standard.destroy();
                    obj.fallback.init();
                }
            },

            standard: {
                init: function() {

                },
                destroy: function() {

                }
            },

            fallback: {
                init: function() {

                },
                destroy: function() {

                }
            }
        };

        // Initialize module
        moduleSmarter9IqSystem.init();

}]);// controller