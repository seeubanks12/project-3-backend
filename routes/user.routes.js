const router = require("express").Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//Update User Info
router.get("/edit-user", isAuthenticated, (req, res, next) => {
  User.findById(req.user._id)
    .then((foundUser) => {
      res.json(foundUser);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.post("/edit-user", isAuthenticated, (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      username: req.body.username,
      email: req.body.email,
      // password: req.body.password,
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

//Delete Users
router.post("/delete", isAuthenticated, (req, res, next) => {
  User.findByIdAndRemove(req.user._id)
    .then(() => {
      res.json("User Deleted");
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

module.exports = router;
