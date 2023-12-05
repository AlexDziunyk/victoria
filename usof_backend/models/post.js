const mysql = require('mysql2');
const db = require('../db/config.json');

class Post {
  connection;
  constructor() {
    this.table = 'post';
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

  async getAllPosts(limit) {
    console.log("limit!", limit)
    const query = `SELECT * FROM ${this.table} LIMIT ${limit};`;
    const [rows] = await this.connectToDB(query);
    return rows;
  }

  async getMyPosts(login) {
    const query = `SELECT * FROM ${this.table} WHERE author='${login}';`;
    const [rows] = await this.connectToDB(query);
    return rows;
  }

  async updatePost(id, title, status, categories, date, content) {
    const query = `UPDATE ${this.table} SET title='${title}', status='${status}', content='${content}', categories='${categories}', date='${date}' WHERE id=${id};`;
    const [rows] = await this.connectToDB(query);
    console.log(23)
    return;
  }

  async deletePost(id) {
    const query = `DELETE FROM ${this.table} WHERE id=${id};`
    const [rows] = await this.connectToDB(query);
    return rows;
  }

  async getPost(id) {
    const query = `SELECT * FROM ${this.table} WHERE id=${id};`;
    const [rows] = await this.connectToDB(query);
    console.log(rows)
    return rows;
  }

  // async deletePost(id) {
  //   const querySelect = `SELECT * FROM ${this.table} WHERE id=${id};`
  //   const [rows] = await this.connectToDB(querySelect);
  //   if(rows) {
  //     const queryDel = `DELETE FROM ${this.table} WHERE id=${id};`
  //     const [rows] = await this.connectToDB(queryDel);
  //   }
  // }

  async createPost(obj) {
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

}

module.exports = Post;