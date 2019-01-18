const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const methodOverride = require("method-override");

var Place = require("./models/place")
mongoose.connect('mongodb://localhost:27017/placestogo', {useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));







app.get('/', function(req, res) {
    res.redirect('/places');
});

app.get('/places', function(req, res) {
    Place.find({}, function(err, places) {
        if(err){
            console.log(err);
        }
        else {
            console.log("Places fetched");
            res.render('index', {places: places})
        }
    });
});

//NEW
app.get('/places/new', function(req, res) {
    res.render('new');
});

app.get('/places/:id', function(req, res) {
    var id = req.params.id;
    Place.findById(id, function(err, place) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {place, place});
        }
    });
});

app.get('/places/:id/edit', function(req, res) {
    var id = req.params.id;
    Place.findById(req.params.id, function(err, place) {
        if(err) {
            console.log(err);
            res.redirect('/places');
        }
        else {
            res.render('edit', {place: place});
        }
    })
})

app.put('/places/:id', function(req, res) {

    Place.findByIdAndUpdate(req.params.id, req.body.place, function(err, place) {
        if(err) {
            console.log(`Error updating place ${err}`);
            res.redirect('/blogs');
            
        }
        else {
            res.redirect(`/places/${req.params.id}`);
        }
    });
});


app.delete('/places/:id', function(req, res) {
    Place.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            console.log(err);
            res.redirect('/places');
        }
        else {
            res.redirect('/places');
        }
    })
})

//create
app.post('/places', function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newPlace = {name: name, image: image, description: description}

    Place.create(newPlace, function(err, place) {
        if (err) {
            console.log(err);
        } else {
            console.log("Place created")
            res.redirect("/places");
        }
    });
});



app.listen(8080, function() {
    console.log("Server is listening on port 8080...")
});
