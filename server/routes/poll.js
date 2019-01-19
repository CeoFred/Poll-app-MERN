//routes
const router = require('express').Router();

const handle = require('../handlers');

const auth = require('../middleware/auth');


router.route('/')
.get(handle.polls)
.post(auth, handle.createPoll)

module.exports = router;