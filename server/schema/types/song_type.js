const mongoose = require("mongoose");
const graphql = require("graphql");
const Song = mongoose.model("songs");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;

const SongType = new GraphQLObjectType({
  name: "SongType",
  // to wrap the fields in a thunk to avoid circular dependency issues where two types reference each other
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    album: {
      type: require("./album_type"),
      resolve(parentValue) {
        return Song.findById(parentValue._id)
        .populate("album")
        .then(song => {
          return song.album;
        })
      }
    },
    artist: {
      type: require("./artist_type"),
      resolve(parentValue) {
        return Song.findById(parentValue._id)
        .populate("artist")
        .then(song => {
          return song.artist;
        })
      }
    },
    url:{ type: GraphQLString }
  })
});
  
module.exports = SongType;