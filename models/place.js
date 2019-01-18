const mongoose = require('mongoose');

var placeSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            author: String,
            message: String,
            date: Date,
            id: String
        }
    ]
});


module.exports = mongoose.model("Place", placeSchema);