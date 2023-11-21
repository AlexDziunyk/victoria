const mysql = require('mysql2');
const db = require('../db/config.json');

class Comment {
  connection;
  constructor() {
    this.table = 'comment';
  }

  connectToDB(query) {
    this.connection = mysql.createConnection({
      host: db.host,
      user: db.user,
      password: db.password,
      database: db.data_base
    });
    this.connection.connect();

    let resultData;
    try {
      resultData = this.connection.promise().query(query);
    } catch (error) {
      resultData = error;
    }
    this.connection.end();
    return resultData;
  }

  async getAllComments() {
    const query = `SELECT * FROM ${this.table};`;
    const [rows] = await this.connectToDB(query);
    return rows;
  }

  async getComments(id) {
    const query = `SELECT * FROM ${this.table} WHERE post_id=${id};`;
    const [rows] = await this.connectToDB(query);
    return rows;
  }

  async getMyComments(login) {
    const query = `SELECT * FROM ${this.table} WHERE author='${login}';`;
    const [rows] = await this.connectToDB(query);
    return rows;
  }

  async findComment(id) {
    const query = `SELECT * FROM ${this.table} WHERE id=${id};`;
    const [rows] = await this.connectToDB(query);
    return rows;
  }

  async createComment(obj) {
    const keysInsert = [];
    const valuesInsert = [];
    for(let key in obj) {
      if(key !== 'id') {
        keysInsert.push(key);
        valuesInsert.push(`"${obj[key]}"`);
      }
    }
    const query = `INSERT ${this.table} (${keysInsert}) VALUES (${valuesInsert});`
    const [rows] = await this.connectToDB(query);
    return rows;
  }

  async updateComment(id, content, date) {
    const query = `UPDATE ${this.table} SET content='${content}', date='${date}' WHERE id=${id};`;
    const [rows] = await this.connectToDB(query);
    
    return;
  }

  async deleteComment(id) {
    const query = `DELETE FROM ${this.table} WHERE id=${id};`
    const [rows] = await this.connectToDB(query);
    return rows;
  }

}

module.exports = Comment;