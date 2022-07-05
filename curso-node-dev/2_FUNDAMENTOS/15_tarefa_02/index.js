const inquirer = require("inquirer");
const chalk = require("chalk");

inquirer
  .prompt([
    {
      name: "nome",
      message: "Qual seu nome?",
    },
    {
      name: "idade",
      message: "Qual sua idade?",
    },
  ])
  .then((answers) => {
    if (!answers.nome || !answers.idade) {
      throw new Error("O nome e a idade são obrigatórios!");
    }

    const response = `O nome do usuário é ${answers.nome} e ele tem ${answers.idade} anos!`;

    console.log(chalk.bgYellow.black(response));
  })
  .catch((error) => {
    console.log(chalk.bgRed,3(`Erro: ${error}`));
  });
