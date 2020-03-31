import gql from "graphql-tag";
export default {
  SIGNUP_USER: gql `
  mutation SignupUser(
    $username: String!, 
    $email: String!,
    $confirmEmail: String!, 
    $password: String!, 
    $birthMonth: String!,
    $birthYear: Int!,
    $birthDay: Int!,
    $gender: String!
  ) {
    signup(
      username: $username, 
      email: $email, 
      confirmEmail: $confirmEmail,
      password: $password, 
      birthMonth: $birthMonth,
      birthYear: $birthYear,
      birthDay: $birthDay, 
      gender: $gender
    ) {
      username
      email
      _id
      token
      loggedIn
      gender
      birthMonth
      birthYear
      birthDay
    }
  }
  `,
  LOGIN_USER: gql `
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      loggedIn
      username
      _id
    }
  }
  `,
  VERIFY_USER: gql `
    mutation VerifyUser($token: String!){
      verifyUser(token: $token){
        loggedIn
      }
    }
  `,
  NEW_PLAYLIST: gql `
    mutation newPlaylist($name: String!, $creator: ID){
      newPlaylist(name: $name, creator: $creator){
        _id
        name
        creator {
          username
        }
        songs {
          _id
          title
          url
          album {
            name
            url
          }
          artist {
            name
          }
        }
      }
    }
  `,
  DELETE_PLAYLIST: gql `
    mutation deletePlaylist($playlistId: ID!){
      deletePlaylist(playlist: $playlistId) {
        _id
      }
    }
  `,
  // ADD_PLAYLIST_SONG: gql `
  // `,
  // DELETE_PLAYLIST_SONG: gql `
  // `
}