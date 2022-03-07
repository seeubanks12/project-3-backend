const router = require("express").Router();
const Pin = require("../models/Pin.model");

router.get("/", (req, res, next) => {
  res.json("Hitting Pins ");
});

//Create New Pin
router.post("/add-pin", (req, res) => {
  Pin.create({
    username: req.body.username,
    title: req.body.title,
    description: req.body.description,project,
    rating: req.body.rating,
    long: req.body.long,
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
router.get("/view-all/:userId", (req, res) => {
  Pin.find({ creatorId: req.params.userId })
    .sort({ createdAt: -1 })
    .populate("creatorId")
    .then((userPins) => {
      res.json({ pins: userPins });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

//View Pin by ID
router.get("/view/:pinId", (req, res) => {
  Pin.findById(req.params.pinId)
    .then((foundPin) => {
      res.json(foundPin);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

//Update Pin
router.get("/edit-pin/:id", (req, res, next) => {
  Pin.findById(req.params.id)
    .then((foundPin) => {
      console.log("We found this pin", foundPin);
      res.json(foundPin, { pins: foundPin });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.post("/edit-pin/:id", (req, res, next) => {
  Pin.findByIdAndUpdate(req.params.id, {
    username: req.body.username,
    title: req.body.title,
    description: req.body.description.trim(),
    rating: req.body.rating,
    long: req.body.long,
    lat: req.body.lat,
  })
    .then((userPins) => {
      res.json({ pins: userPins,  });
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.post("/delete-pin/:id", (req, res, next) => {
  Pin.findByIdAndRemove(req.params.id)
    .then((userPins) => {
      res.json(userPins);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

module.exports = router;
