const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require("mongoose");

const AuthService = require("../services/auth");

const UserType = require("./types/user_type");
const SongType = require("./types/song_type");
const ArtistType = require("./types/artist_type");
const AlbumType = require("./types/album_type");

const Song = mongoose.model("songs");
const Artist = mongoose.model("artists");
const Album = mongoose.model("albums");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        confirmEmail: { type: GraphQLString },
        birthMonth: { type: GraphQLString },
        birthYear: { type: GraphQLInt },
        birthDay: { type: GraphQLInt },
        gender: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.signup(args);
      }
    },
    login: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.login(args);
      }
    },
    logout: {
      type: UserType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, args) {
        return AuthService.logout(args);
      }
    },
    verifyUser: {
      type: UserType,
      args: {
        token: { type: GraphQLString }
      },
      resolve(_, args) {
        return AuthService.verifyUser(args);
      }
    },
    newAlbum: {
      type: AlbumType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        artist: { type: GraphQLID }
      },
      resolve(_, args) {
        return new Album(args).save();
      }
    },
    deleteAlbum: {
      type: AlbumType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(_, { _id }) {
        return Album.remove({ id });
      }
    },
    newArtist: {
      type: ArtistType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(_, { name }) {
        return new Artist({ name }).save();
      }
    },
    deleteArtist: {
      type: ArtistType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(_, { _id }) {
        return Artist.remove({ id });
      }
    },
    deleteSong: {
      type: SongType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(_, { _id }) {
        return Song.remove({ id });
      }
    },
    newSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString },
        album: { type: GraphQLID },
        artist: { type: GraphQLID }
      },
      resolve(_, args) {
        return new Song(args).save();
      }
    }
  }
});

module.exports = mutation;
