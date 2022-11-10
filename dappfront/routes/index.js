var express = require('express');
var router = express.Router();

let private_key;


/* GET home page. */
router.get('/', function(req, res, next) {
 	res.render('index', { title: "Token Transfer" });
});


module.exports = router;
