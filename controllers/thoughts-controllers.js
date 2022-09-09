const Thought = require('../models/thought');
const User = require('../models/user');

// Thought controller object
const thoughtController = {
    
    //Function to get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
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

    // Function to get Thought by ID
    getThoughtById({params}, res) {
        Thought.findOne({_id: params.id})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbData => {
            res.json(dbData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        })
    },

    // Function to create Thought
    createThought({body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: body.userId},
                {$push: {thoughts: _id}},
                {new: true}
            )
            .then(dbData => {
                if(!dbData) {
                    res.status(404).json({message: 'user not found'});
                    return;
                }
                res.json(dbData)
            })
        })
        .catch(err => {
            res.json(err)
        })
    }
}

module.exports = thoughtController