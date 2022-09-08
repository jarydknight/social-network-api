const router = require('express').Router();
const { getAllUsers, createNewUser } = require('../../controllers/users-controller');

router.route('/')
.get(getAllUsers)
.post(createNewUser)

module.exports = router;