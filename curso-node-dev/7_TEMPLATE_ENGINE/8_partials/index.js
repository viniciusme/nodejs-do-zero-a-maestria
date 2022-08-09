const express = require("express");
const exphbs = require("express-handlebars");

const app = express();
const port = 3000;
const hbs = exphbs.create({
  partialsDir: ["views/partials"],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/dashboard", (req, res) => {
  const items = ["Item a", "Item b", "Item c"];

  res.render("dashboard", { items });
});

app.get("/post", (req, res) => {
  const post = {
    title: "Aprender Node.js",
    category: "Javascript",
    body: "Este artigo vai te ajudar a aprender Node.js...",
    comments: 4,
  };

  res.render("blogpost", { post });
});

app.get("/blog", (req, res) => {
  const post = [
    {
      title: "Aprender Node.js",
      category: "Javascript",
      body: "Teste",
      comments: 4,
    },
    {
      title: "Aprender PHP",
      category: "PHP",
      body: "Teste",
      comments: 4,
    },
    {
      title: "Aprender Python",
      category: "Python",
      body: "Teste",
      comments: 4,
    },
  ];

  res.render("blog", { post });
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
  console.log(`App rodando na porta ${port}!`);
});
