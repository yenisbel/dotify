const mongoose = require("mongoose");
const graphql = require("graphql");
const Playlist = mongoose.model("playlists");
const User = mongoose.model("users")
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

const PlaylistType = new GraphQLObjectType({
  name: "PlaylistType",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    creator: {
      type: require("./user_type"),
      resolve(parentValue) {
        return User.findById(parentValue.creator)
      }
    },
    songs: {
      type: new GraphQLList(require("./song_type")),
      resolve(parentValue) {
        return Playlist.findById(parentValue._id)
          .populate("songs")
          .then(playlist => {
            return playlist.songs
          })
      }
    }
  })
});

module.exports = PlaylistType