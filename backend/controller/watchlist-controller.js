const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const WatchList = require("../models/watchlist");

const createList = async (req, res, next) => {
  const { list_name, visibility } = req.body;
  const createdList = new WatchList({
    uid: req.user,
    list_name: list_name,
    visibility: visibility,
  });
  await createdList.save();
  res.json({ message: "List created Successfully" });
};

const addToList = async (req, res, next) => {
  const {
    _id,
    id,
    poster_path,
    original_title,
    vote_average,
    genre_ids,
    overview,
  } = req.body;

  res.json(
    await WatchList.updateOne(
      { _id: _id },
      {
        $addToSet: {
          list: {
            id: id,
            poster_path: poster_path,
            original_title: original_title,
            vote_average: vote_average,
            genre_ids: genre_ids,
            overview: overview,
          },
        },
      }
    )
  );
};

const getUserLists = async (req, res, next) => {
  let lists = await WatchList.find({ uid: req.user }, { uid: 0, __v: 0 });

  if (lists) {
    lists = lists.map((item, index) => {
      return {
        ...item.toObject(),
        movie_count: item.list.length,
        list: undefined,
      };
    });
    return res.json(lists);
  }
  res.json([]);
};

const getList = async (req, res, next) => {
  const listData = await WatchList.findOne({ _id: req.params.id }, { __v: 0 });
  const token = req.header("x-auth-token");
  if (listData.visibility === "Private") {
    if (!token)
      return res.status(401).json("No authentication token, access denied");
    try {
      const verified = jwt.verify(token, process.env.JWT_SALT);
      if (!verified)
        return res
          .status(401)
          .json("Token verification failed, authorization denied");

      if (verified.id === listData.uid) {
        return res.json({ ...listData.toObject(), same_user: true });
      }

      return res.json({
        message: "You don't have authorization to view this list",
      });
    } catch (error) {
      return res.status(401).json("Invalid token");
    }
  }
  try {
    if (token) {
      const verified = jwt.verify(token, process.env.JWT_SALT);
      if (!verified)
        return res
          .status(401)
          .json("Token verification failed, authorization denied");
      return res.json({
        ...listData.toObject(),
        same_user: verified.id === listData.uid,
      });
    } else {
      return res.json({
        ...listData.toObject(),
        same_user: false,
      });
    }
  } catch (error) {
    return res.status(401).json("Invalid token");
  }
};

const checkMovieExists = async (req, res, next) => {
  const list = await WatchList.findOne({ _id: req.params.id });

  if (list) {
    return res.json(
      list.list.some((item) => {
        console.log(item.id.toString() === req.params.mid.toString());
        return item.id.toString() === req.params.mid.toString();
      })
    );
  }
};

const deleteList = async (req, res, next) => {
  const result = await WatchList.findOne({ _id: req.params.id, uid: req.user })
    .remove()
    .exec();
  console.log(req.params.id);
  if (result.deletedCount === 1) {
    return res.json({ message: "Deleted successfully! " });
  }
  res.status(404).json({ message: "Unable to find list" });
};

const deleteListItem = async (req, res, next) => {
  const result = await WatchList.updateOne(
    {
      _id: req.params.id,
      uid: req.user,
    },
    { $pull: { list: { id: req.params.mid } } }
  );
  if (result.modifiedCount === 1) {
    return res.json({ message: "Deleted Successfuly!" });
  }
  res.status(404).json({ message: "Unable to find movie" });
};

module.exports = {
  addToList,
  createList,
  getUserLists,
  getList,
  checkMovieExists,
  deleteList,
  deleteListItem,
};
