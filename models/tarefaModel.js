const db = require('./database');

class Tarefa {
  constructor(id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  async salvar(){
    let sql = null;
    if(this.id === undefined) {
      sql = `INSERT INTO tarefa (title, description, usuario_id_usuario) VALUES ("${this.title}", "${this.description}", 1)`;
    }
    return await db.query(sql);
  }

  static async listarTarefas(){
    return await db.query(`SELECT * FROM tarefa`);
  }

  static async deleteTarefa(idTarefa) {
    return await db.query(`DELETE FROM tarefa WHERE id_tarefa=${idTarefa}`);
  }
}

module.exports = Tarefa;
