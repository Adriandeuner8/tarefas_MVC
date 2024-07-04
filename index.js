const express = require("express");
const session = require("express-session");
var expressLayouts = require("express-ejs-layouts");
const tarefaController = require("./controllers/tarefaController");
const usuarioController = require("./controllers/usuarioController");
const app = express();
const port = 3000;
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "i1n2f3o4",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
	
	if (!req.session.user) {
	  if (req.originalUrl == "/login" || req.originalUrl == "/usuario/autenticar") {
		app.set("layout", "./layouts/login");
		res.locals.layoutVariables = {
		  url: process.env.URL,
		  img: "/img/",
		  style: "/css/",
		  title: "Login",
		};
		next();
	  } else {
		res.redirect("/login");
	  }
	} else {
	  app.set("layout", "./layouts/tarefas");
	  res.locals.layoutVariables = {
		url: process.env.URL,
		img: "/img/",
		style: "/css/",
		title: "Tarefas",
		user: req.session.user,
	  };
	  if (req.session.msg) {
		res.locals.layoutVariables.msg = req.session.msg;
		delete req.session.msg;
	  }
	  next();
	}
  });
  

app.get("/", (req, res) => {
  res.send("<h1>API Tarefas</h1>");
});
app.get("/tarefas", (req, res) => {
	if (req.session.user) {
	  tarefaController.getTarefas(req, res);
	} else {
	  res.redirect("/login");
	}
  });  
app.post("/tarefas", tarefaController.addTarefa);
app.get("/tarefa/delete/:id", tarefaController.deleteTarefa);
app.get("/login", usuarioController.login);
app.post("/usuario/autenticar", usuarioController.autenticar);
app.get('/logout', usuarioController.logout);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

