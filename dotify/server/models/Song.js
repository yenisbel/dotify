const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SongSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: "artists",
    required: true
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: "albums",
    required: true
  },
  url: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model("songs", SongSchema);