const router = require("express").Router();
const User = require("../models/User.model");

//Update User Info
router.get("/edit-user/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then((foundUser) => {
      res.json(foundUser);
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

router.post("/edit-user/:id", (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id,
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
router.post("/delete/:id", (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json("User Deleted");
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

module.exports = router;
