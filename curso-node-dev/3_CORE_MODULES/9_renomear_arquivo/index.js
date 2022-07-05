const fs = require("fs");

const arquivo = "arquivo.txt";
const arqNovo = "novo.txt";

fs.rename(arquivo, arqNovo, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`O arquivo ${arquivo} foi renomeado para ${arqNovo}`);
});
