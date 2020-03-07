const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PlaylistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  songs: [{
    type: Schema.Types.ObjectId,
    ref: "songs"
  }]
});

PlaylistSchema.statics.addPlaylistSong = (playlistId, songId) => {
  const Playlist = mongoose.model('playlists');

  return Playlist.findByIdAndUpdate(playlistId, { $push: { songs: songId }}, { new: true })
    .then(playlist => playlist)
};

PlaylistSchema.statics.removePlaylistSong = (playlistId, songId) => {
  const Playlist = mongoose.model('playlists');

  return Playlist.findByIdAndRemove(playlistId, { $pull: { songs: songId } }, { new: true })
    .then(playlist => playlist)
};

module.exports = mongoose.model("playlists", PlaylistSchema);