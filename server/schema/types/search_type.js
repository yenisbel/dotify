const mongoose = require("mongoose");
const graphql = require("graphql");
const Artist = mongoose.model("artists");
const Playlist = mongoose.model("playlists");
const Album = mongoose.model("albums");
const ArtistType = require("./artist_type");
const PlaylistType = require("./playlist_type");
const AlbumType = require("./album_type");
const { GraphQLUnionType } = graphql;

// const SearchType = new GraphQLObjectType({
//   name: "SearchType",
//   fields: () => ({
//     artists: { 
//       type: require("./artist_type"),
//       resolve(parentValue) {
//         return Artist.find({ 
//           // name: { $regex: parentValue.searchTerm, $options: "i" } 
//           name: parentValue.searchTerm
//         });
//       }
//     }
//   })
// });

const SearchType = new GraphQLUnionType({
  name: 'SearchType',
  types: [AlbumType, PlaylistType, ArtistType],
  resolveType(value) {
    if (value instanceof Album) {
      return AlbumType;
    }
    if (value instanceof Playlist) {
      return PlaylistType;
    }
    if (value instanceof Artist) {
      return ArtistType;
    }
  }
});

module.exports = SearchType;