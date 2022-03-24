const { json } = require('express');
let express = require('express');
let router = express.Router();
const sql = require("../dboperation");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


//test connection
router.get('/testconnect', function (req, res, next) {
  sql.getdata(res);/* 
  res.render('index', { title: 'Express' }); */
});


router.get("/getdata_withQuery", function (req, res, next) {
  sql.getdata_withQuery().then((result) => {
    res.json(result[0]);
  });
});


module.exports = router;
