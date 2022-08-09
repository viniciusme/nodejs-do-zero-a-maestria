// const express = require("express");
// const exphbs = require("express-handlebars");

// const app = express();
// const port = 3000;

// app.engine("handlebars", exphbs.engine());
// app.set("view engine", "handlebars");

// app.get("/", (req, res) => {
//   const user = {
//     name: "Vinicius",
//     surname: "Mendes",
//     age: 39,
//   };

//   res.render("home", { user: user });
// });

// app.listen(port, () => {
//   console.log(`App rodando na porta ${3000}!`);
// });
let A4 = "haaaah";
let A2 = "haah";
let A100 = "h" + "a".repeat(100) + "h";
let multipleA = /ha{3,}h/;
console.log(multipleA.test(A4));
console.log(multipleA.test(A2));
console.log(multipleA.test(A100));
