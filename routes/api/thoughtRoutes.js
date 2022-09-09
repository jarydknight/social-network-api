const router = require('express').Router();
const { getAllThoughts, createThought, getThoughtById, deleteThought } = require('../../controllers/thoughts-controllers')

router.route('/')
.get(getAllThoughts)
.post(createThought)

router.route('/:id')
.get(getThoughtById)
.delete(deleteThought)

module.exports = router;