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

//statics allow for defining functions that exist directly on the model.

PlaylistSchema.statics.addPlaylistSong = (playlistId, songId) => {
  const Playlist = mongoose.model('playlists');

  return Playlist.findByIdAndUpdate(playlistId, { $push: { songs: songId }}, { new: true })
    .then(playlist => playlist)
};

PlaylistSchema.statics.removePlaylistSong = (playlistId, songId) => {
  const Playlist = mongoose.model('playlists');
  const Song = mongoose.model('songs');

  return Playlist.findByIdAndUpdate(playlistId, { $pull: { songs: songId }})
    .then(playlist => playlist)
};

PlaylistSchema.statics.deletePlaylist = (playlistId) => {
  const Playlist = mongoose.model('playlists');
  const User = mongoose.model('users');

  return Playlist.findByIdAndDelete(playlistId)
    .then(playlist => {
      User.findByIdAndUpdate(playlist.creator, { $pull: { createdPlaylists: playlist._id}})
      return playlist;
    })
};

module.exports = mongoose.model("playlists", PlaylistSchema);