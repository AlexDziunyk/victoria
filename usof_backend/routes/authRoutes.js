const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {register, login, authMe, passwordReset, submitResetPassword} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/me', requireAuth, authMe);
router.post('/password-reset', passwordReset);
router.get(`/password-reset/submit/:id/:token`, submitResetPassword);
module.exports = router;
