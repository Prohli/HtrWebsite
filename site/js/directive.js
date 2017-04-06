htrApp.directive('ratingEintrag', function () {
    return {
        priority: 0,
        scope: false,
        templateUrl: 'templates/rating.html',
        restrict: 'A'              
    };
})
htrApp.directive('htrMenu', function () {
    return {
        priority: 0,
        scope: false,
        templateUrl: 'partials/menu.html',
        restrict: 'E'
    }
});

htrApp.directive('htrFooter', function () {
    return {
        priority: 0,
        scope: false,
        templateUrl: 'partials/footer.html',
        restrict: 'E'
    }
});

