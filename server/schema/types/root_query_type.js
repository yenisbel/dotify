const mongoose = require("mongoose");
const graphql = require("graphql");
const { 
  GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull, GraphQLString 
} = graphql;

const UserType = require("./user_type");
const SongType = require("./song_type");
const ArtistType = require("./artist_type");
const AlbumType = require("./album_type");
const SearchType = require("./search_type");
const PlaylistType = require("./playlist_type");

const User = mongoose.model("users");
const Song = mongoose.model("songs");
const Artist = mongoose.model("artists");
const Album = mongoose.model("albums");
const Playlist = mongoose.model("playlists");

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: UserType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        return User.findById(args._id);
      }
    },
    albums: {
      type: new GraphQLList(AlbumType),
      resolve() {
        return Album.find({});
      }
    },
    album: {
      type: AlbumType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Album.findById(args._id);
      }
    },
    artists: {
      type: new GraphQLList(ArtistType),
      resolve() {
        return Artist.find({});
      }
    },
    artist: {
      type: ArtistType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Artist.findById(args._id);
      }
    },
    songs: {
      type: new GraphQLList(SongType),
      resolve() {
        return Song.find({});
      }
    },
    song: {
      type: SongType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Song.findById(args._id);
      }
    },
    playlists: {
      type: new GraphQLList(PlaylistType),
      resolve() {
        return Playlist.find({});
      }
    },
    search: {
      type: new GraphQLList(SearchType),
      args: { filter: { type: new GraphQLNonNull(GraphQLString) } },
      async resolve(parentValue, args) {
        const albums = await Album.find({ 
          name: { $regex: args.filter, $options: "i" }
        });
        const artists = await Artist.find({
          name: { $regex: args.filter, $options: "i" } 
        });
        const playlists = await Playlist.find( {
          name: { $regex: args.filter, $options: "i" }
        });
        return albums.concat(playlists).concat(artists);
      },
    },
    playlist: {
      type: PlaylistType,
      args: { _id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
        return Playlist.findById(args._id);
      }
    }
  })
});

module.exports = RootQueryType;
