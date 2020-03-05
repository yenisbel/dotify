const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ArtistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  albums: [{
    type: Schema.Types.ObjectId,
    ref: "albums"
  }]
});

ArtistSchema.statics.findAlbums = function(artistId){
  return this.findById(artistId)
  .populate("albums")
  .then(artist => artist.albums);
      
};

module.exports = mongoose.model("artists", ArtistSchema);