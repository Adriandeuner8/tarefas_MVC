const db = require("./database");
const md5 = require("md5");

class Usuario {
  static async autenticar(email, senha) {
    const sql = `SELECT * FROM usuario WHERE email = '${email}' AND senha= '${md5(senha)}'`;
    return await db.query(sql);
  }
}

module.exports = Usuario;
