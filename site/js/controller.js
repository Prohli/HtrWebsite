var max = 5;
htrApp.value("ratingConstants", {
    max: max,
    isReadonly: true,
    hoveringOver: function (value) {
        return {
            overStar: value,
            percent: 100 * (value / max)
        };
    }
});

htrApp.controller('RatingListCtrl',
        function ($scope, ratingService, ratingConstants) {
            $scope.max = ratingConstants.max;
            $scope.isReadonly = ratingConstants.isReadonly;
            $scope.hoveringOver = ratingConstants.hoveringOver;            
            ratingService.getRatings().then(function (ratings) {
                $scope.entries = ratings;
            });

        });

htrApp.controller('deleteRatingCtrl', function ($scope, ratingService) {
    $scope.deleteRating = function (entry) {
        var canBeDeleted = confirm('Die Bewertung löschen?');
        if (canBeDeleted) {
            ratingService.deleteRating(entry).then(function () {
                var index = $scope.entries.indexOf(entry);
                if (index > -1) {
                    $scope.entries.splice(index, 1);
                }
            });
        }
    };
});


htrApp.controller('newRatingCtrl', function ($scope, ratingService, ratingConstants) {
    $scope.max = ratingConstants.max;
    $scope.isReadonly = ratingConstants.isReadonly;
    $scope.hoveringOver = ratingConstants.hoveringOver;
    $scope.tbxIsReadOnly = false;

    $scope.saveRating = function () {
        $scope.tbxIsReadOnly = true;
        console.log("Start Save Rating");

        var rating = angular.copy($scope.newEntry);
        ratingService.newRating(rating)
            .then(function (res) {
                $('#ratingResult').html(
                '<div class="alert alert-success" role="alert"> Die Bewertung wurde <b>erfolgreich</b> abgeschickt. <a href="bewertung">Alle Bewertungen anzeigen.</a><br/>Um Ihre Bewertung zu Bearbeiten verwenden sie folgenden link: http://127.0.0.1:3030/aktualisiereBewertung?updateCode=' + res.updateCode + '</div>');
            }, function (res) {
                alert("Es ist ein unerwartetet Fehler beim Speichern aufgetreten :( :( :(");
            });
    }
});

htrApp.controller('updateRatingCtrl', function ($scope, $routeParams, ratingService, ratingConstants) {
    $scope.max = ratingConstants.max;
    $scope.isReadonly = ratingConstants.isReadonly;
    $scope.hoveringOver = ratingConstants.hoveringOver;
    $scope.tbxIsReadOnly = false;

    $scope.isContentVisible = false;
    if ($routeParams.updateCode) {
        ratingService.getRating($routeParams.updateCode).then(function (rating) {
            $scope.entry = rating;
            $scope.isContentVisible = rating !== null;
        });
    }

    $scope.saveRating = function () {
        console.log("Start Save Rating");

        $scope.tbxIsReadOnly = true;

        ratingService.updateRating(angular.copy($scope.entry))
            .then(function (res) {
                $('#ratingResult')
                    .html(
                        '<div class="alert alert-success" role="alert">Die Bewertung wurde <b>erfolgreich</b> gespeichert. <a href="bewertung">Alle Bewertungen anzeigen.</a><br/><br/>Um Ihre Bewertung nochmals zu Bearbeiten verwenden sie folgenden link: http://127.0.0.1:3030/aktualisiereBewertung?updateCode=' + res.updateCode + '</div>');
            },
                function (res) {
                    alert("Es ist ein unerwartetet Fehler beim Speichern aufgetreten :( :( :(");
                });
    }
});
