const User = require('../models/user');

const userController = {
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
    }
}

module.exports = userController;