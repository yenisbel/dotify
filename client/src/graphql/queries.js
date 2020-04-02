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
  `,
  GET_CURRENT_USER: gql`
    query GetCurrentUser {
      username @client
    }
  `,
  GET_CURRENT_USER_ID: gql`
    query GetCurrentUser {
      userId @client
    }
  `,
  GET_CURRENT_ALBUM: gql`
    query GetCurrentAlbum {
      currentAlbum @client{
        _id
        songs {
          _id
          title
          url
        }
      }
    }
  `,
  GET_CURRENT_SONG: gql`
    query GetCurrentSong {
      currentSong @client{
        _id
        title
        url
        album {
          url
        }
        artist {
          name
        }
      }
    }
  `,
  FETCH_SONGS: gql`
    query fetchSongs{
      songs{
        _id
        title
        artist
        album
        url
      }
    }
  `,
  FETCH_SONG: gql`
    query fetchSong($id: ID!){
      song(_id: $id){
        _id
        title
        artist
        album
        url
      }
    }
  `,
  FETCH_ARTISTS: gql`
    query fetchArtists{
      artists{
        _id
        name
      }
    }
  `,
  FETCH_ARTIST: gql`
    query fetchArtist($id: ID!){
      artist(_id: $id){
        _id
        name
        albums{
          _id
          name
          genre
          url,
          songs{
            _id
            title
            url
          }
        }
      }
    }
  `,
  FETCH_ALBUMS: gql`
    query fetchAlbums{
      albums{
        _id
        name
        genre
        artist{
          _id
          name
        }
        url
        songs{
          _id
          title
          url
        }
      }
    }
  `,
  FETCH_ALBUM: gql`
    query fetchAlbum($id: ID!){
      album(_id: $id){
        _id
        name
        url
        songs {
          _id
          title
          url
          album {
            url
          }
          artist {
            name
          }
        }
        artist{
          _id
          name
        }
      }
    }
  `,
  SEARCH: gql`
    query search($filter: String!) {
      search(filter: $filter) {
        ... on AlbumType {
          __typename
          _id
          name
          genre
          artist{
            _id
            name
          }
          url
          songs{
            _id
            title
            url
          }
        }
        ... on ArtistType {
          __typename
          _id
          name
        }
        ... on PlaylistType {
          __typename
          _id,
          name
        }
      }
    }
  `,
  FETCH_PLAYLISTS: gql`
    query fetchPlaylists {
      playlists {
        _id
        name
        songs {
          title
        }
      }
    }
  `,
  FETCH_PLAYLIST: gql`
    query fetchPlaylist($id: ID!) {
      playlist(_id: $id) {
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
}
