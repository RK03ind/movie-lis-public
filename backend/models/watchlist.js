const mongoose = require("mongoose");

const watchListSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  list_name: { type: String, required: true },
  visibility: { type: String, required: true },
  list: [
    {
      _id: false,
      id: Number,
      poster_path: String,
      original_title: String,
      genre_ids: [Number],
      overview: String,
      vote_average: Number,
    },
  ],
});

module.exports = mongoose.model("watch-list", watchListSchema, "watch-list");
