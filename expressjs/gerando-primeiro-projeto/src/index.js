let http = require("http"),
  express = require("express"),
  path = require("path"),
  app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "view"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.get("/pato", (req, res) => {
  res.render("pato", { title: "Página do pato" });
});

app.get("/outra", (req, res) => {
  res.render("outra");
});

http.createServer(app).listen(3000);
