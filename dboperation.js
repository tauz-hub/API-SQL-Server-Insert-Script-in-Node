let config = require("./dbconfig");
const sql = require("mssql");

async function getdata(res) {
  try {
    /* let pool = await sql.connect(config); */
    sql.connect(config, function (err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();
      // query to the database and get the records
      request.query('select * from clientes', function (err, recordset) {
        if (err) console.log(err)
        // send records as a response
        res.send(recordset);
      });
    });
    console.log("sql server connected...");
  } catch (error) {
    console.log(" mathus-error :" + error);
  }
}


async function getdata_withQuery() {
  try {
    let pool = await sql.connect(config);

    let res = await pool.request().query("SELECT *  FROM clientes");
    return res.recordsets;
  } catch (error) {
    console.log(" mathus-error :" + error);
  }
}


module.exports = {
  getdata: getdata,
  getdata_withQuery: getdata_withQuery
};
