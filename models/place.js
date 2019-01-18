const mongoose = require('mongoose');

var placeSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            message: String,
            date: Date
        }
    ]
});


module.exports = mongoose.model("Place", placeSchema);