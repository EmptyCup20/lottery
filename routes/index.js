var express = require('express'),
    router = express.Router(),
    app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET lottery page. */
router.get('/lottery', function(req, res, next) {
    res.render('lottery', { title: 'Express' });
});

module.exports = router;
