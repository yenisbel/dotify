const graphql = require("graphql");
const { GraphQLSchema } = graphql;

// import that lovely Root Query you just finished up and create your new schema!
const query = require("./types/root_query_type");

module.exports = new GraphQLSchema({
  query
});
