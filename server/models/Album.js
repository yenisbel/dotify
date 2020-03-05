const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AlbumSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "artists",
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  songs: [{
    type: Schema.Types.ObjectId,
    ref: "songs"
  }],
  url: {
    type: String,
    required: true
  }
});

AlbumSchema.statics.findSongs = function(albumId){
  return this.findById(albumId)
  .populate("songs")
  .then(album => album.songs);
      
};


module.exports = mongoose.model("albums", AlbumSchema);