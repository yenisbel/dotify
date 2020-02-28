import gql from "graphql-tag";

export default {
  FETCH_USERS: gql`
    query FetchUsers{
      users {
        _id
        username
        email
        gender
        dateOfBirth
      }
    }
  `,
  FETCH_USER: gql`
    query fetchUser($id: ID!){
      user(_id: $id){
        _id
        username
        email
        gender
        dateOfBirth
      }
    }
  `,
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `
} 

