const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID } = graphql;
const mongoose = require("mongoose");

const AuthService = require("../services/auth");

const UserType = require("./types/user_type");
const SongType = require("./types/song_type");
const ArtistType = require("./types/artist_type");
const AlbumType = require("./types/album_type");
const PlaylistType = require("./types/playlist_type");

const Song = mongoose.model("songs");
const Artist = mongoose.model("artists");
const Album = mongoose.model("albums");
const Playlist = mongoose.model("playlists");
const User = mongoose.model("users");

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
        artist: { type: GraphQLID },
        url: { type: GraphQLString }
      },
      resolve(_, args) {
        return new Album(args).save().then(album => {
          Artist.findByIdAndUpdate(args.artist, {$push: { albums: album._id}})
          .exec()
          return album;
        });
      }
    },
    deleteAlbum: {
      type: AlbumType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, { _id }) {
        return Album.remove({ _id });
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
        _id: { type: GraphQLID }
      },
      resolve(_, { _id }) {
        return Artist.remove({ _id });
      }
    },
    deleteSong: {
      type: SongType,
      args: {
        _id: { type: GraphQLID }
      },
      resolve(_, { _id }) {
        return Song.remove({ _id });
      }
    },
    newSong: {
      type: SongType,
      args: {
        title: { type: GraphQLString },
        album: { type: GraphQLID },
        artist: { type: GraphQLID },
        url: { type: GraphQLString }
      },
      resolve(_, args) {
        return new Song(args).save().then(song => {
          Album.findByIdAndUpdate(args.album, { $push: { songs: song._id } })
            .exec()
          return song
        });
      }
    },
    newPlaylist: {
      type: PlaylistType,
      args: {
        name: { type: GraphQLString },
        creator: { type: GraphQLID }
      },
      resolve(_, args) {
        return new Playlist(args).save().then(newPlaylist =>{
          User.findByIdAndUpdate(args.creator, { $push: { playlists: newPlaylist._id }})
            .exec()
          return newPlaylist
        });
      }
    },
    // newLikedPlaylist: {
    //   type: PlaylistType,
    //   args: {
    //     name: { type: GraphQLString },
    //     creator: { type: GraphQLID }
    //   },
    //   resolve(_, args) {
    //     return new Playlist(args).save().then(likedPlaylist => {
    //       User.findByIdAndUpdate(args.creator, { $push: { likedPlaylists: likedPlaylist._id } })
    //         .exec()
    //       return likedPlaylist
    //     });
    //   }
    // },
    addPlaylistSong: {
      type: PlaylistType,
      args: {
        playlist: { type: GraphQLID },
        song: { type: GraphQLID }
      },
      resolve(_, { playlist, song }) {
        return Playlist.addPlaylistSong(playlist, song);
      }
    },
    removePlaylistSong: {
      type: PlaylistType,
      args: {
        playlist: { type: GraphQLID },
        song: { type: GraphQLID }
      },
      resolve(_, { playlist, song }) {
        return Playlist.removePlaylistSong(playlist, song);
      }
    },
    deletePlaylist: {
      type: PlaylistType,
      args: {
        playlist: { type: GraphQLID }
      },
      resolve(_, { playlist }) {
        return Playlist.deletePlaylist(playlist);
      }
    }
  }
});

module.exports = mutation;
