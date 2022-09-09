const router = require('express').Router();
const { getAllThoughts, createThought, getThoughtById, deleteThought, updateThought } = require('../../controllers/thoughts-controllers')

router.route('/')
.get(getAllThoughts)
.post(createThought)

router.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(deleteThought)

module.exports = router;