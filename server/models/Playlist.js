const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PlaylistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  creator: [{
    type: Schema.Types.ObjectId,
    ref: "users"
  }],
  songs: [{
    type: Schema.Types.ObjectId,
    ref: "songs"
  }]
});

module.exports = mongoose.model("playlists", PlaylistSchema);