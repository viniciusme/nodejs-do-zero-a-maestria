// imprimir mais de um valor

const x = 10;
const y = "Joâo";
const z = [1, 2];

console.log(x, y, z);

// contagem de impressões
console.count(`O valor de x é: ${x}, contagem`);
console.count(`O valor de x é: ${x}, contagem`);
console.count(`O valor de x é: ${x}, contagem`);
console.count(`O valor de x é: ${x}, contagem`);

// Variável entre string
console.log("O nome é %s, ele é programador", y);

// limpar console.log
setTimeout(() => {
  console.clear();
}, 2000);
