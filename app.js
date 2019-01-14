const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const methodOverride = require("method-override");

mongoose.connect('mongodb://localhost:27017/placestogo', {useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

var places = [
    {name: "Machu Picchu", image: "https://media-cdn.tripadvisor.com/media/photo-s/02/5c/5c/8a/a-voir-absolument.jpg"},
    {name: "Spain", image: "https://exclusivesmedia.webjet.com.au/uploads/2018/08/Highlights-Spain-2.jpg"},
    {name: "Mount Assiniboine Provincial Park", image: "https://s-i.huffpost.com/gadgets/slideshows/484816/slide_484816_6655992_compressed.jpg"},
        {name: "Machu Picchu", image: "https://media-cdn.tripadvisor.com/media/photo-s/02/5c/5c/8a/a-voir-absolument.jpg"},
    {name: "Spain", image: "https://exclusivesmedia.webjet.com.au/uploads/2018/08/Highlights-Spain-2.jpg"},
    {name: "Mount Assiniboine Provincial Park", image: "https://s-i.huffpost.com/gadgets/slideshows/484816/slide_484816_6655992_compressed.jpg"},
        {name: "Machu Picchu", image: "https://media-cdn.tripadvisor.com/media/photo-s/02/5c/5c/8a/a-voir-absolument.jpg"},
    {name: "Spain", image: "https://exclusivesmedia.webjet.com.au/uploads/2018/08/Highlights-Spain-2.jpg"},
    {name: "Mount Assiniboine Provincial Park", image: "https://s-i.huffpost.com/gadgets/slideshows/484816/slide_484816_6655992_compressed.jpg"},
     ]


var placeSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Place = mongoose.model("Place", placeSchema);



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