const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const port = 3000;

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/dashboard", (req, res) => {
  const items = ["Item a", "Item b", "Item c"];

  res.render("dashboard", { items });
});

app.get("/", (req, res) => {
  const user = {
    name: "Vinicius",
    surname: "Mendes",
    age: 39,
  };

  const palavra = "Teste";

  const auth = false;

  const approved = true;

  res.render("home", { user: user, palavra, auth, approved });
});

app.listen(port, () => {
  console.log(`App rodando na porta ${3000}!`);
});
