const { Schema, model } = require("mongoose");

const songSchema = new Schema({

    name:{
        type:String, 
        required: true
        },
        artist:String, 
        disc:String,
        image:String,
        url:String
    })
const Song = model("song", songSchema);

module.exports = Song;