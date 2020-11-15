const router = require('express').Router();
//Route middleware
router.use('/auth', require('./auth/auth'));
router.use('/users', require('./users/users'));

module.exports = router;