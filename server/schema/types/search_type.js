const mongoose = require("mongoose");
const graphql = require("graphql");
const Artist = mongoose.model("artists");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } = graphql;

const SearchType = new GraphQLObjectType({
  name: "SearchType",
  fields: () => ({
    artists: { 
      type: require("./artist_type"),
      resolve(parentValue) {
        return Artist.find({ 
          // name: { $regex: parentValue.searchTerm, $options: "i" } 
          name: parentValue.searchTerm
        });
      }
    }
  })
});

module.exports = SearchType;