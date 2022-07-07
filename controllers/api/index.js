const router = require('express').Router();

const userRoutes = require('./user-routes');

const movieDbRoutes = require('./movieDB-routes');


router.use('/users', userRoutes);

router.use('/movieRoutes',movieDbRoutes );

module.exports = router;
