var express = require('express');
var router = express.Router();

// membuata api create
router.post('/', async (req, res) => {
    res.send('ini adalah post');
})

module.exports = router;