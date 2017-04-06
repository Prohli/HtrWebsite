htrApp.service("ratingService", function ($log, $http) {
    var vm = this;

    function randomString(length) {
        return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
    }

    vm.getRatings = function () {
        return $http.get('/rating')
	        .then(function (response) {
	            $log.info("'Ratings' erfolgreich geladen.", response.data);
	            return response.data;
	        },
	            function () {
	                $log.error("Fehler beim Laden der 'Ratings'.", arguments);
	                return [];
	            });
    }

    vm.getRating = function (updateCode) {
        return $http.get('/rating?code=' + updateCode)
            .then(function (response) {
                $log.info("Das Rating mit dem UpdateCode '" + updateCode + "' wurde erfolgreich geladen.",
                    response.data);
                return response.data;
            },
                function () {
                    $log.error("Fehler beim Laden des Ratings mit dem UpdateCode '" + updateCode + "'.", arguments);
                    return {};
                });
    }

    vm.deleteRating = function (rating) {
        if (!rating) {
            throw new Error("Es muss eine 'rating' übergeben werden um das Löschen durchzuführen!");
        }

        return $http.post('/deleteRating', { id: rating.id })
             .then(function (res) {
                 $log.info("Rating mit Id '" + rating.id + "' erfolgreich gelöscht.");
             },
                 function () {
                     $log.info("Fehler beim löschen des Ratings mit Id '" + rating.id + "'.", arguments);
                 });
    }

    vm.newRating = function (rating) {
        if (!rating) {
            throw new Error("Kein Rating übergeben!");
        }

        var param = angular.copy(rating);
        param.updateCode = randomString(5);
        
        return $http.post('/newRating', param)
            .then(function (res) {
                $log.info("Das Rating '", rating, "' wurde erfolgreich gespeichert.");
                    return res.data;
                    //$('#ratingResult').html('<div class="alert alert-success" role="alert"> Die Bewertung wurde <b>erfolgreich</b> abgeschickt. <a href="bewertung">Alle Bewertungen anzeigen.</a><br/>Um Ihre Bewertung zu Bearbeiten verwenden sie folgenden link: http://127.0.0.1:3030/aktualisiereBewertung?updateCode=' + code + '</div>');
                },
                function (res) {
                    $log.info("Fehler beim Speichern des Ratings '", rating, "'!");
                    return null;
                });
    }

    vm.updateRating = function (rating) {
        if (!rating) {
            throw new Error("Kein Rating übergeben!");
        }

        rating = angular.copy(rating);
        rating.oldUpdateCode = rating.updateCode;
        rating.updateCode = randomString(5);

        return $http.post('/updateRating', rating)
            .then(function (res) {
                $log.info("Das Rating '", rating, "' wurde erfolgreich gespeichert.");
                return res.data;
                //$('#ratingResult').html('<div class="alert alert-success" role="alert"> Die Bewertung wurde <b>erfolgreich</b> abgeschickt. <a href="bewertung">Alle Bewertungen anzeigen.</a><br/>Um Ihre Bewertung zu Bearbeiten verwenden sie folgenden link: http://127.0.0.1:3030/aktualisiereBewertung?updateCode=' + code + '</div>');
            },
                function (res) {
                    $log.info("Fehler beim Speichern des Ratings '", rating, "'!");
                });
    }

});