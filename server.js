// --- modules ---
var express = require('express');
var jsonFile = require('jsonfile');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

var ratingFile = 'site/data/ratings.json';

function generateId(array) {
    array.sort(function (a, b) {
        return a.id - b.id;
    });

    var start = array.length;
    for (var i in array) {
        var element = array[i];
        if (element.id == start) {
            start = start + 1;
        }
    }
    return start;
}


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.static('site'));

app.post('/newRating', function (req, res) {
    console.log("Star Save new Rating - Server :: ", req.body)
    var ratings = jsonFile.readFileSync(ratingFile);
    var id = generateId(ratings);
    var now = new Date();
    var newRating = {
        id: id,
        firma: req.body.firma,
        kontakt: req.body.kontakt,
        date: now,
        message: req.body.message,
        rating: req.body.rating,
        updateCode: req.body.updateCode
    };

    ratings.push(newRating);
    jsonFile.writeFileSync(ratingFile, ratings);
	console.log("returning new rating: ", newRating);
    return res.json(newRating);
});

app.post('/deleteRating', function (req, res) {
    console.log('Start Delete Rating');
    var ratings = jsonFile.readFileSync(ratingFile);
    for (rating in ratings) {
        if (ratings[rating].id == req.body.id) {
            var rat = ratings.splice(rating, 1);
            jsonFile.writeFileSync(ratingFile, ratings);
            res.status(200).send(rat);
        }
    }
});

app.get('/rating', function(req, res){
	console.log("Getting /rating...");
	
	var ratings = jsonFile.readFileSync(ratingFile);
	if(req.query.code){
		console.log("Found code '"+req.query.code+"' in query params.");
		var found = ratings.filter(function(x){return x.updateCode === req.query.code;});
		return res.json(found.length === 1 ? found[0] : null);
	}
	
	console.log("Found noting in query params.");
	return res.json(ratings);
});


app.post('/updateRating', function (req, res) {
    console.log('Start Update Rating');
    var now = new Date();   
    var ratings = jsonFile.readFileSync(ratingFile);
    for (rating in ratings) {
        console.log(ratings[rating].updateCode + ' ' + req.body.oldUpdateCode);
        if (ratings[rating].updateCode == req.body.oldUpdateCode) {         
            ratings[rating].firma = req.body.firma;
            ratings[rating].kontakt = req.body.kontakt;
            ratings[rating].date = now;
            ratings[rating].message = req.body.message;
            ratings[rating].rating = req.body.rating;
            ratings[rating].updateCode = req.body.updateCode;
            jsonFile.writeFileSync(ratingFile, ratings);
            return res.json(ratings[rating]);
        }
    }
});


app.route('/*').get(function (req, res) {
    return res.sendFile('/site/index.html', { root: __dirname });
});

app.listen(3030, function () {
    console.log('Server läuft auf Port: 3030');
});

