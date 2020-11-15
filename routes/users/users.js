const router = require('express').Router();
const verify = require('../verifyToken');
const { getProfileDetails } = require('../../controllers/users')

router.get('/profile', verify, getProfileDetails);

module.exports = router;