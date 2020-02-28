const mongoose = require("mongoose");
const graphql = require("graphql");
const { 
  GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLDate
 } = graphql;

const UserType = new GraphQLObjectType({
  name: "UserType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    dateOfBirth: { type: GraphQLDate },
    gender: { type: GraphQLString },
    token: { type: GraphQLString },
    loggedIn: { type: GraphQLBoolean }
  })
});

module.exports = UserType;
