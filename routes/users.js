var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // Berasal dari config .env nya
  res.send(process.env.APP_NAME);
});

router.get('/hai', (req,res, next) => {
  res.send('selamat datang di hai')
})

module.exports = router;
