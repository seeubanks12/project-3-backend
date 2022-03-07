const router = require("express").Router();
const Trip = require("../models/Trip.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("Trips are HERE");
});

//Create a Trip
router.post("/create-trip", (req, res) => {
  Trip.create({
    title: req.body.title,
    location: req.body.location,
    start: req.body.start,
    end: req.body.end,
    description: req.body.description,
    creatorId: req.user._id,
    // created: req.body.create,
    // lastUpdate: req.body.lastUpdate,
    // user: req.body.user,
    // guests: req.body.guests,
  })
    .then((createdTrip) => {
      res.json(createdTrip);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

//View Trips - will use calendar API
router.get("/view-calendar", (req, res) => {
  Trip.find({})
    .then((foundCalendar) => {
      res.json(foundCalendar);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

//Update Trip
router.get("/update-trip/:id", (req, res, next) => {
  Trip.findById(req.params.id)
    .then((foundTrip) => {
      console.log("We found this pin", foundTrip);
      res.json(foundTrip);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

router.post("/update-trip/:id", (req, res, next) => {
  Trip.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      location: req.body.location,
      start: req.body.start,
      end: req.body.end,
      description: req.body.description,
    },
    { new: true }
  )
    .then((updatedTrip) => {
      res.json(updatedTrip);
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

//delete trip
router.post("/delete-trip/:id", (req, res, next) => {
  Trip.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json("We can't go anymore!");
    })
    .catch((err) => {
      res.status(500).json(err.message);
    });
});

module.exports = router;