/*
|--------------------------------------------------------------------------
| Display list of social icons
|--------------------------------------------------------------------------
*/
gogoroApp.directive('socialIcons', ['GogoroUrlService', function (GogoroUrlService) {
    var urls = GogoroUrlService.gogoroUrlGenerate();

    //
    var directory_prefix = GogoroUrlService.getResourcesFolderName();

    var templateUrl = directory_prefix + '/Scripts/global/_directive/template/social-icons.html';

    // Social media icons collection
    var iconCollection = {
        'white': {
            'facebook': 'gicon--facebook2',
            'youtube': 'gicon--youtube2',
            'linkedin': 'gicon--linkedin2',
            'twitter': 'gicon--twitter2',
            'blog': 'gicon--blog2',
            'hashtag': 'gicon--hashtag2',
            'insta': 'gicon--insta2',
        },
        'black': {
            'facebook': 'gicon--facebook',
            'youtube': 'gicon--youtube',
            'linkedin': 'gicon--linkedin',
            'twitter': 'gicon--twitter',
            'blog': 'gicon--blog',
            'hashtag': 'gicon--hashtag',
            'insta': 'gicon--insta',
        }
    };

    return {
        restrict: 'E',
        scope: {},
        replace: true,
        templateUrl: templateUrl,
        link: function (scope, element, attrs) {
            scope.color = attrs.iconColor;
            switch (scope.color) {
                case 'white':
                    scope.icons = iconCollection[scope.color];
                    break;
                case 'black':
                    scope.icons = iconCollection[scope.color];
                    break;
                default:
                    scope.icons = iconCollection[scope.color];
            }
            
            //scope.iconNum = (scope.iconColor === 'white') ? 2 : '';
            
           


        },
    };
}]);