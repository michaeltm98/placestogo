const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

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


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function() {
    console.log("Server is listening on port 3000...")
});

app.get('/', function(req, res) {
    res.render("index", {places: places});
});