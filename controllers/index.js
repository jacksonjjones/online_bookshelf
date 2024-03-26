const router = require('express').Router();

const apiRoutes = require('./api');
const bookRoutes = require('./bookRoutes');

router.use('/books', bookRoutes );
router.use('/api', apiRoutes );

module.exports = router;
