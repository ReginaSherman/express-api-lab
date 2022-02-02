//require the mongoose package from the connection pool
const mongoose = require('../db/connection')

// make a new schema with 2 properties and assign it to a variable 
const GifSchema = new mongoose.Schema({
    name: String, //give it a name and a data type
    url: String,
    
})

// instantiate the model, calling it "Gifs" and with the schema we just made
const Gifs = mongoose.model('Gifs', GifSchema)

module.exports = Gifs