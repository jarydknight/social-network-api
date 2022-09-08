const router = require('express').Router();
const { getAllUsers, createNewUser, getUserById, updateUserById, deleteUserById } = require('../../controllers/users-controller');

router.route('/')
.get(getAllUsers)
.post(createNewUser)

router.route('/:id')
.get(getUserById)
.put(updateUserById)
.delete(deleteUserById)

module.exports = router;