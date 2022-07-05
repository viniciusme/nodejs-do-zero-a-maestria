const chalk = require("chalk");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Qual a sua linguagem preferida? ", (language) => {
  if (language === "Delphi" || "delphi") {
    console.log(
      chalk.red(language),
      "Ôooooo, isso nem é linguem. Isso é uma IDE!!!"
    );
  } else {
    console.log("A minha linguagem preferida é:", chalk.green(language));
  }

  readline.close();
});
