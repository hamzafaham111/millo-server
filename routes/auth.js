const express = require('express');
const { signin, signup } = require('../controllers/auth');

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
// router.post('/recover-password', login);
// router.post('/verify-token', login);


module.exports = router;