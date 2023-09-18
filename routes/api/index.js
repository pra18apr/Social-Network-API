// Index File for API Routes
// Dependencies
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// Add the sub directory `/users` to the routes created in user-routes.js
router.use('/users', userRoutes);

// Add the sub directory `/thoughts` to the routes created in thought-routes.js
router.use('/thoughts', thoughtRoutes);

// Export the router
module.exports = router;