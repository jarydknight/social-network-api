const router = require('express').Router();
const { getAllUsers, createNewUser, getUserById, updateUserById, deleteUserById, addToFriendList } = require('../../controllers/users-controller');

router.route('/')
.get(getAllUsers)
.post(createNewUser);

router.route('/:id')
.get(getUserById)
.put(updateUserById)
.delete(deleteUserById);

router.route('/:userId/friends/:friendId')
.put(addToFriendList)

module.exports = router;