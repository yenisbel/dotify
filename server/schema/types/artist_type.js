const mongoose = require("mongoose");
const graphql = require("graphql");
const Artist = mongoose.model("artists");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLBoolean } = graphql;

const ArtistType = new GraphQLObjectType({
  name: "ArtistType",
  // to wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    albums: {
      type: new GraphQLList(require("./album_type")),
      resolve(parentValue){
        return Artist.findAlbums(parentValue._id);
      }
    }
  })
});

module.exports = ArtistType;