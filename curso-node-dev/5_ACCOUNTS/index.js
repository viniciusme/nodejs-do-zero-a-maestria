const inquirer = require('inquirer');
const chalk = require('chalk');

const fs = require('fs');

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'O que você gostaria de fazer?',
        choices: [
          'Criar Conta',
          'Consultar Saldo',
          'Depositar',
          'Sacar',
          'Sair',
        ],
      },
    ])
    .then((answer) => {
      const action = answer['action'];

      if (action === 'Criar Conta') {
        createAccount();
      } else if (action === 'Consultar Saldo') {
        getAccountBalance();
      } else if (action === 'Depositar') {
        deposit();
      } else if (action === 'Sacar') {
        withdraw();
      } else if (action === 'Sair') {
        console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'));

        process.exit();
      }
    })
    .catch((error) => console.log(error));
}

// create an account
function createAccount() {
  console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'));
  console.log(chalk.green('Defina as opções da sua conta a seguir'));

  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Digite um nome para a sua conta',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName'];

      console.info(accountName);

      if (!fs.existsSync('accounts')) {
        fs.mkdirSync('accounts');
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black('Esta conta já existe, escolha outro nome!')
        );

        buildAccount();

        return;
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance": 0}',
        function (error) {
          console.log(error);
        }
      );

      console.log(chalk.green('Parabéns, a sua conta foi criada"'));
      operation();
    })
    .catch((error) => console.log(error));
}

// add an amount to user account
function deposit() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta?',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName'];

      // verify if account exists
      if (!checkAccount(accountName)) {
        return deposit();
      }

      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'Quanto você deseja depositar?',
          },
        ])
        .then((answer) => {
          const amount = answer['amount'];

          // add an amount
          addAmount(accountName, amount);
          operation();
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
}

// check if the account exists
function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(
      chalk.bgRed.black('Está conta não existe, escolha outro nome!')
    );

    return false;
  }

  return true;
}

// add an amount
function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(
      chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!')
    );

    return deposit();
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (error) {
      console.log(error);
    }
  );

  console.log(
    chalk.green(`Foi depositado o valor de R$ ${amount} na sua conta!`)
  );
}

// get account
function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: 'utf8',
    flag: 'r',
  });

  return JSON.parse(accountJSON);
}

// show account balance
function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta?',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName'];

      // verify if account exists
      if (!checkAccount(accountName)) {
        return getAccountBalance();
      }

      const accountData = getAccount(accountName);

      console.log(
        chalk.bgBlue.black(
          `Olá o saldo da sua conta é de R$ ${accountData.balance}`
        )
      );

      operation();
    })
    .catch((error) => console.log(error));
}

// withdraw an amount from user account
function withdraw() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName'];

      if (!checkAccount(accountName)) {
        return withdraw();
      }

      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'Quanto você deseja sacar?',
          },
        ])
        .then((answer) => {
          const amount = answer['amount'];

          removeAmount(accountName, amount);
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
}

function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(
      chalk.bgRed.black('ocorreu um erro, tente novamente mais tarde!')
    );

    return withdraw;
  }

  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black('Valor indisponível!'));

    return withdraw();
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (error) {
      console.log(error);
    }
  );

  console.log(
    chalk.green(`Foi realizado um saque de R$ ${amount} na sua conta!`)
  );

  operation();
}
