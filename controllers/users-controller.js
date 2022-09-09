const User = require('../models/user');

// User controller object
const userController = {

    // Function to get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .sort({
            _id: -1
        })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({
            _id: -1
        })
        .then(dbData => {
            res.json(dbData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Function to get user by ID
    getUserById({params}, res) {
        User.findOne({_id: params.id})
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .sort({
            _id: -1
        })
        .then(dbData => {
            res.json(dbData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    createNewUser({body}, res) {
        User.create(body)
        .then(dbData => {
            res.json(dbData)
        })
        .catch(err => {
            res.json(err);
        })
    },

    // Function to update user by ID
    updateUserById({params, body}, res) {
        User.findOneAndUpdate(
            {_id: params.id}, 
            body, 
            {
                new: true,
                runValidators: true
            }
        )
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({message: 'User not found'});
                return;
            }
            res.json(dbData);
        })
        .catch(err => {res.json(err)})
    },

    // Function to delete user by ID
    deleteUserById({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({message: 'User not found'});
                return;
            }
            res.json(dbData);
        })
        .catch(err => {res.json(err)})
    },

    // Function to add friend to user's friend list
    addToFriendList({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId}, 
            {$push: {friends: params.friendId}},
            {new: true}
        )
        // .populate({
        //     path: 'users',
        //     select: '-__v'
        // })
        // .select('-__v')
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({ message: 'No friend found with this id!' });
                return;
              }
              res.json(dbData);
        })
        .catch(err => res.json(err));
    },

    // Function to remove friend from user's friend list
    removeFronFriendList({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true}
        )
        .then(dbData => {
              res.json(dbData);
        })
        .catch(err => res.json(err));
    }
}

module.exports = userController;