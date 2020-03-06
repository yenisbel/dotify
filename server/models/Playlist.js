const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PlaylistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  songs: [{
    type: Schema.Types.ObjectId,
    ref: "songs"
  }]
});

// PlaylistSchema.statics.addPlaylistSong = (playlistId, songId) => {
//   //addCreatedPlaylistSong
//   const Playlist = mongoose.model('playlists');
//   const Song = mongoose.model('songs');

//   return Playlist.findById(playlistId).then(playlist => {
//     // if the product already had a category
//     if (product.category) {
//       // find the old category and remove this product from it's products
//       Category.findById(product.category).then(oldcategory => {
//         oldcategory.products.pull(product);
//         return oldcategory.save();
//       });
//     }
//     //  find the Category and push this product in, as well as set this product's category
//     return Category.findById(categoryId).then(newCategory => {
//       product.category = newCategory;
//       newCategory.products.push(product);

//       return Promise.all([product.save(), newCategory.save()]).then(
//         ([product, newCategory]) => product
//       );
//     });
//   });
// };

module.exports = mongoose.model("playlists", PlaylistSchema);