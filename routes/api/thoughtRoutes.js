const router = require('express').Router();

router.route('/').get(function (req, res) {res.json("test")})

module.exports = router;