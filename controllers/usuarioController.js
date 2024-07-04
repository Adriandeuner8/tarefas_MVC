const Usuario = require("../models/usuarioModel");

async function autenticar(req,res) { 
    const resp = await Usuario.autenticar(req.body.email, req.body.senha);
    if (resp && resp.length > 0) {
      req.session.user = resp[0];
      req.session.msg = {
           class: "alert-success",
           msg: "Usuário autenticado com sucesso!"
      }
      return res.redirect('/tarefas');
    } else {
      req.session.msg = {
           class: "alert-danger",
           msg: "Usuário não encontrado!"
      }
  	res.redirect('/login');
	}
  
} 
  
  function login(req, res) {
    return res.render('login');
  }
  
  function logout(req, res) {
	req.session.destroy((err) => {
	  if (err) {
		console.log(err);
		return res.redirect('/tarefas');
	  } else {
		return res.redirect('/login');
	  }
	});
  }

module.exports = { login, autenticar, logout};
  
