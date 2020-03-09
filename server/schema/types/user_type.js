const mongoose = require("mongoose");
const graphql = require("graphql");
const { 
  GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLInt, GraphQLList
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
    playlists: {
      type: new GraphQLList(require("./playlist_type")),
      resolve(parentValue) {
        return User.findById(parentValue._id)
          .populate("playlists")
          .then(user => {
            return user.playlists;
          })
      }
    },
    // createdPlaylists: { 
    //   type: new GraphQLList(require("./playlist_type")),
    //   resolve(parentValue) {
    //     return User.findById(parentValue._id)
    //     .populate("createdPlaylists")
    //     .then(user => {
    //       return user.createdPlaylists;
    //     })
    //   }
    // },
    // likedPlaylists: {
    //   type: new GraphQLList(require("./playlist_type")),
    //   resolve(parentValue) {
    //     return User.findById(parentValue._id)
    //       .populate("likedPlaylists")
    //       .then(user => {
    //         return user.likedPlaylists;
    //       })
    //   }
    // },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean }
  })
});

module.exports = UserType;
