const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeroutes");

// Using middleware to specify routes
router.use("/", homeRoutes); // Using homeRoutes for main routes
router.use("/api", apiRoutes);

module.exports = router;
