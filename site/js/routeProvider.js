htrApp.config(function($locationProvider, $routeProvider){    
$locationProvider.html5Mode(true);
	$routeProvider
    .when('/' , {templateUrl: 'home.html'})
	.when('/leistungsspektrum',{templateUrl: 'leistungsspektrum.html'})
	.when('/architektur',{templateUrl: 'architektur.html'})
	.when('/gebaeudetechnik',{templateUrl: 'gebaeudetechnik.html'})
	.when('/projekte',{templateUrl: 'projekte.html'})
	.when('/htr',{templateUrl: 'htr.html'})
	.when('/kontakt',{templateUrl: 'kontakt.html'})		 	 
	.when('/bewertung', { templateUrl: 'bewertung.html', controller: 'RatingListCtrl' })
	.when('/neueBewertung', { templateUrl: 'neueBewertung.html', controller: 'newRatingCtrl'})
    .when('/aktualisiereBewertung', { templateUrl: 'aktualisiereBewertung.html', controller: 'updateRatingCtrl' })
    .otherwise({redirectTo:'/'});	
});