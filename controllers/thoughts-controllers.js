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
    },

    // Function to update Thought
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.id},
            body,
            {
                new: true,
                runValidators: true
            }
        )
        .then(dbData => {
            if(!dbData) {
                res.status(404).json({message: 'User not found'});
                return;
            }
            res.json(dbData)
        })
        .catch(err => {
            res.json(err)
        })
    },

    // Function to delete Thought
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
        .then(dbData => {
            if(!dbData) {
                res.status(404).json({message: 'User not found'});
                return
            }
            res.json(dbData);
        })
        .catch(err => {res.json(err)})
    },

    // Function to create reaction
    createReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true}
        )
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbData => {
            if(!dbData) {
                res.status(404).json({message: 'Thought not found'});
                return;
            }
            res.json(dbData);
        })
        .catch(err => {res.json(err)})
    },

    // Function to delete reaction
    deleteReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: body.reactionId}}},
            {new: true}
        )
        .then(dbData => {
            res.json(dbData);
        })
        .catch(err => {res.json(err)})
    }
}

module.exports = thoughtController