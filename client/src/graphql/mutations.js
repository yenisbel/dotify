import gql from "graphql-tag";
export default {
  SIGNUP_USER: gql `
  mutation SignupUser(
    $username: String!, 
    $email: String!,
    $confirmEmail: String!, 
    $password: String!, 
    $dateOfBirth: String!, 
    $gender: String!
  ) {
    signup(
      username: $username, 
      email: $email, 
      confirmEmail: $confirmEmail,
      password: $password, 
      dateOfBirth: $dateOfBirth, 
      gender: $gender
    ) {
      username
      email
      _id
      token
      loggedIn
      gender
      dateOfBirth
    }
  }
  `,
  LOGIN_USER: gql `
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      loggedIn
      username
    }
  }
  `,
  VERIFY_USER: gql `
    mutation VerifyUser($token: String!){
      verifyUser(token: $token){
        loggedIn
      }
    }
  `
}