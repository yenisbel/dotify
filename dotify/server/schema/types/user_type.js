const mongoose = require("mongoose");
const graphql = require("graphql");
const { 
  GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLInt
 } = graphql;

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
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean }
  })
});

module.exports = UserType;
