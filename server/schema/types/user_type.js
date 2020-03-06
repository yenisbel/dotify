const mongoose = require("mongoose");
const graphql = require("graphql");
const { 
  GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLInt
} = graphql;
const User = mongoose.model("users");

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    birthMonth: { type: GraphQLString },
    birthYear: { type: GraphQLInt },
    birthDay: { type: GraphQLInt },
    gender: { type: GraphQLString },
    createdPlaylists: { 
      type: require("./playlist_type"),
      resolve(parentValue) {
        return User.findById(parentValue._id)
        .populate("createdPlaylists")
        .then(user => {
          return user.createdPlaylists;
        })
      }
    },
    likedPlaylists: {
      type: require("./playlist_type"),
      resolve(parentValue) {
        return User.findById(parentValue._id)
          .populate("createdPlaylists")
          .then(user => {
            return user.createdPlaylists;
          })
      }
    },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean }
  })
});

module.exports = UserType;
