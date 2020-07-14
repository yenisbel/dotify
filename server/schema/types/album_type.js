const mongoose = require("mongoose");
const graphql = require("graphql");
const Album = mongoose.model("albums");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLBoolean } = graphql;

const AlbumType = new GraphQLObjectType({
  name: "AlbumType",
  // to wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    artist: {
      type: require("./artist_type"),
      resolve(parentValue) { // the resolve function will be where we tell GraphQL how to get data from our database.
        return Album.findById(parentValue._id)
        .populate("artist")
        .then(album => {
          return album.artist;
        })
      }
    },
    songs: {
      type: new GraphQLList(require("./song_type")),
      resolve(parentValue){
        return Album.findSongs(parentValue._id);
      }
    },
    url: { type: GraphQLString }
  })
});

module.exports = AlbumType;