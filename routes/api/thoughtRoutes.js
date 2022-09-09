const router = require('express').Router();
const { getAllThoughts, createThought, getThoughtById } = require('../../controllers/thoughts-controllers')

router.route('/')
.get(getAllThoughts)
.post(createThought)

router.route('/:id')
.get(getThoughtById)

module.exports = router;