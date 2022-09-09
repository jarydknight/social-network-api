const router = require('express').Router();
const { getAllThoughts, createThought, getThoughtById, deleteThought, updateThought, createReaction, deleteReaction } = require('../../controllers/thoughts-controllers')

router.route('/')
.get(getAllThoughts)
.post(createThought)

router.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought)

router.route('/:thoughtId/reactions')
.post(createReaction)
.delete(deleteReaction)

module.exports = router;