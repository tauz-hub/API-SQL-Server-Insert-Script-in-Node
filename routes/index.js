import express from 'express'
let router = express.Router();
import sql from '../dboperation.js'

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


//query connection
router.get('/request/:query', function (req, res, next) {

  const query = req.params.query
  console.log("query" + query)
  sql.queryRequest(query, res);
});



export default router;
