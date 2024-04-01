const router = require("express").Router();

const apiRoutes = require("./api");
const homeroutes = require("./homeroutes");

// Using middleware to specify routes
router.use("/", homeroutes); // Using homeRoutes for main routes
router.use("/api", apiRoutes);

module.exports = router;
