//Exemplo 1
var Pessoa = require("./lib/Pessoa"),
  pessoas = [];

for (let i = 1; i <= 7; i++) {
  let p = new Pessoa(`Nome ${i}`, `Sobrenome ${i}`);
  pessoas.push(p);
}

for (let i = 0; i < pessoas.length; i++) {
  console.log(pessoas[i].get_full_name());
}

//Exemplo 2
let fs = require("fs");
let path = require("path");
const certPath = path.join(__dirname, "./data/abobrinha.txt");

fs.readFile(certPath, "utf-8", function (err, data) {
  if (err) throw err;
  console.log(data);
});
