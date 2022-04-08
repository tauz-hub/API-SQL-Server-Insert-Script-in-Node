import readline from 'readline';
import axios from 'axios';
import fs from 'fs'
const readInterface = readline.createInterface({
  input: fs.createReadStream('./INSERTWG.sql'),
  output: false,
  terminal: false
});
let i = 0;
/* 
const listaLinkRequest = []
console.log(readInterface.)
await readInterface.on('line', async (linha) => {
  const link = `http://localhost:3000/request/${encodeURIComponent(linha)}`
  //console.log("alooo")
  
  await listaLinkRequest.push(link)
  i++;

})

//console.log("tá me ouvindo?")
listaLinkRequest.forEach(async (link) => {
  await axios.get(link).then((req) => {
    // console.log(req.status)
  })
}) */
const listaLinks = []
fs.readFile('./INSERTWG.sql', 'utf-8', function (err, data) {
  const linhas = data.split(/\r?\n/);
  console.log(linhas.length)

  linhas.forEach(function (linha) {
    listaLinks.push(`http://localhost:3000/request/${encodeURIComponent(linha)}`)

  })
})
console.log(listaLinks)