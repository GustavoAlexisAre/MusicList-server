const { Schema, model } = require("mongoose");



const playlistSchema = new Schema({

    name:{
        type:String, 
        required: true
        },
    traks:[{type: Schema.Types.ObjectId, ref:"song"}]
        
    })
const Playlist = model("playlist", playlistSchema);

module.exports = Playlist;