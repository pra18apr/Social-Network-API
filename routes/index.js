// Index router API Routes

const router = require('express').Router();
const apiRoutes = require('./api');

// add the `/api` sub directory prefix to all of the imported api routes
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>😫 404 Error!</h1>');
});

module.exports = router;