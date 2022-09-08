const router = require('express').Router();
const { getAllUsers, createNewUser, getUserById } = require('../../controllers/users-controller');

router.route('/')
.get(getAllUsers)
.post(createNewUser)

router.route('/:id')
.get(getUserById)

module.exports = router;