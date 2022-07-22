const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const port = 3000;

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  const user = {
    name: "Vinicius",
    surname: "Mendes",
    age: 39,
  };

  res.render("home", { user: user });
});

app.listen(port, () => {
  console.log(`App rodando na porta ${3000}!`);
});
