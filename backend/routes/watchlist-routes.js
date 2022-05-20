const express = require("express");
const router = express.Router();
const watchListController = require("../controller/watchlist-controller");
const auth = require("../middleware/auth");

router.get("/", auth, watchListController.getUserLists);
router.get("/check/:id/:mid", auth, watchListController.checkMovieExists);
router.get("/:id", watchListController.getList);
router.post("/", auth, watchListController.addToList);
router.post("/create", auth, watchListController.createList);
router.delete("/delete/:id", auth, watchListController.deleteList);
router.delete("/delete/:id/:mid", auth, watchListController.deleteListItem);

module.exports = router;
