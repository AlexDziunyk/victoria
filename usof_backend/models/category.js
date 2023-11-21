const mysql = require('mysql2');
const db = require('../db/config.json');

class Category {
  connection;
  constructor() {
    this.table = 'category';
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

  async getAllCategories() {
    const query = `SELECT * FROM ${this.table};`;
    const [rows] = await this.connectToDB(query);
    return rows;
  }

  async getCategory(id) {
    const query = `SELECT * FROM ${this.table} WHERE id=${id};`;
    const [rows] = await this.connectToDB(query);
    return rows;
  }

  async getMyCategories(login) {
    const query = `SELECT * FROM ${this.table} WHERE author='${login}';`;
    const [rows] = await this.connectToDB(query);
    return rows;
  }

  async createCategory(obj) {
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


  async updateCategory(id, title, description) {
    const query = `UPDATE ${this.table} SET title='${title}', description='${description}' WHERE id=${id};`;
    const [rows] = await this.connectToDB(query);
    
    return;
  }

  async deleteCategory(id) {
    const query = `DELETE FROM ${this.table} WHERE id=${id};`
    const [rows] = await this.connectToDB(query);
    return rows;
  }


  

}

module.exports = Category;