import config from './dbconfig.js'
import sql from 'mssql'
async function queryRequest(query, res) {
  try {
    sql.connect(config, function (err) {
      if (err) console.log(err);
      const request = new sql.Request();


      request.query(query, function (err, recordset) {
        if (err) {
          res.send("bad request")
        }
        recordset?.recordset?.map((item) => item.TEMPO_EXECUCAO = item.TEMPO_EXECUCAO?.toISOString().replace(/(.*)T(.*)Z/, '$2'))

        res.send(recordset);
      })

    });
  } catch (error) {
    console.log("mathus-error :" + error);
  }
}

export default {
  queryRequest
}
