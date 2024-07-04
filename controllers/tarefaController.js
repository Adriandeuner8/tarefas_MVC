const Tarefa = require('../models/tarefaModel'); 

async function getTarefas(req, res) { 
  const tarefas = await Tarefa.listarTarefas(); 
  res.render('tarefas', { tarefas }); 
} 

async function addTarefa(req, res) { 
  const { title } = req.body; 
  const tarefa = new Tarefa(undefined, title, "");
  let msg = '';
  if (await tarefa.salvar()) {
    msg = { class: "alert-success", msg: "Tarefa adicionada com sucesso!" };
  } else {
    msg = { class: "alert-danger", msg: "Falha ao adicionar a tarefa!" };
  }
  req.session.msg = msg;
  res.redirect('/tarefas'); 
} 

async function deleteTarefa(req, res){
  const idTarefa = req.params.id;
  let msg = '';
  if(await Tarefa.deleteTarefa(idTarefa)){
    msg = { class: "alert-success", msg: "Tarefa deletada com sucesso!" };
  } else {
    msg = { class: "alert-danger", msg: "Falha ao deletar a tarefa!" };
  }
  req.session.msg = msg;
  res.redirect('/tarefas');
}

module.exports = { getTarefas, addTarefa, deleteTarefa };
