const router = require("express").Router();
const { is } = require("express/lib/request");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const Pin = require("../models/Pin.model");

router.get("/", (req, res, next) => {
  res.json("Hitting Pins ");
});

//Create New Pin
router.post("/add-pin", isAuthenticated, (req, res) => {
  Pin.create({
    username: req.user.username,
    title: req.body.title,
    description: req.body.description,
    rating: req.body.rating,
    lng: req.body.lng,
    lat: req.body.lat,
    creatorId: req.user._id,
  })
    .then((createdPin) => {
      res.json(createdPin);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

//View All Pins
//Users will be able to view a page with their individual pins
router.get("/view-all", isAuthenticated, (req, res) => {
  Pin.find({ creatorId: req.user._id })
    // .sort({ createdAt: -1 })
    // .populate("creatorId")
    .then((userPins) => {
      res.json(userPins);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

//View Pin by ID
router.get("/view", isAuthenticated, (req, res) => {
  Pin.findById(req.user._id)
    .then((foundPin) => {
      res.json(foundPin);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

//Update Pin
router.get("/edit-pin", isAuthenticated, (req, res, next) => {
  Pin.findById(req.user._id)
    .then((foundPin) => {
      console.log("We found this pin", foundPin);
      res.json(foundPin, { pins: foundPin });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.post("/edit-pin/:id", isAuthenticated, (req, res, next) => {
  Pin.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      title: req.body.title,
      description: req.body.description.trim(),
      rating: req.body.rating,
    },
    { new: true }
  )
    .then((userPins) => {
      res.json({ pins: userPins });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.post("/delete-pin/:id", isAuthenticated, (req, res, next) => {
  Pin.findByIdAndRemove(req.params.id)
    .then((userPins) => {
      res.json(userPins);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

module.exports = router;
