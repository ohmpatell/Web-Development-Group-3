const express = require("express");
const {
  getHotels,
  getHotel,
  deleteHotel,
  addHotel,
  updateHotel,
} = require("../controllers/index.server.controller.hotel");

const requireAuth = require("../middleware/requireAuth");
const multer = require("multer");
const hotelRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Get all hotels
hotelRouter.route("/").get(getHotels);
//Get hotel by ID
hotelRouter.route("/:id").get(getHotel);

//Require auth for all the hotel edition operations routes
hotelRouter.use(requireAuth);
//Add hotel with image
hotelRouter.route("/add").post(upload.single("image"), addHotel);
//Update hotel
hotelRouter
  .route("/update/:id")
  .post(upload.single("image"), updateHotel);
//Delete hotel
hotelRouter.route("/delete/:id").delete(deleteHotel);

module.exports = hotelRouter;
