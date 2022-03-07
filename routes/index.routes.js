const router = require("express").Router();
const authRoutes = require("./auth.routes");
const pinRoutes = require('./pin.routes')
const tripRoutes = require('./trip.routes')
const userRoutes = require('./user.routes')

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("Index good to go");
});

router.use("/auth", authRoutes);
router.use('/pin', pinRoutes);
router.use('/trip', tripRoutes)
router.use('/user', userRoutes)

module.exports = router;
