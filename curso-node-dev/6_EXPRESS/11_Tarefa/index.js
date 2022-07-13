const express = require("express");
const app = express();

const port = 5000;

const projectsRoutes = require("./projects");

app.use(express.static("public"));

app.use("/projects", projectsRoutes);

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
