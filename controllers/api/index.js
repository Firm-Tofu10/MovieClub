const router = require('express').Router();

const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users' userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/comments', commentRoutes);

module.exports = router;