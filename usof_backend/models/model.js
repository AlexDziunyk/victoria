const mysql = require('mysql2');
const db = require('../db/config.json');

class Model {
  connection;
  constructor(table) {
      this.table = table;
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
  async find(id) {
    const query = `SELECT * FROM ${this.table} WHERE id=${id};`;
    const [rows] = await this.connectToDB(query);
    if(rows.length > 0) {
      return rows[0];
    }
    return false;
  }

  async updateFullName(id, fullName) {
    const query = `UPDATE ${this.table} SET fullName='${fullName}' WHERE id=${id};`;
    const [rows] = await this.connectToDB(query);
    
    return;
  }

  async updateAvatar(id, avatar) {
    const query = `UPDATE ${this.table} SET avatar='${avatar}' WHERE id=${id};`;
    const [rows] = await this.connectToDB(query);
    return;
  }

  async findUserByIdAndLogin({id, login}) {
    const query = `SELECT * FROM ${this.table} WHERE id=${id} AND login=${login};`;
    const [rows] = await this.connectToDB(query);
    if(rows.length > 0) {
      return rows[0];
    }
    return false;
  }

  async findUserByLogin(login) {
    const query = `SELECT * FROM ${this.table} WHERE login='${login}';`;
    const [rows] = await this.connectToDB(query);
    if(rows.length > 0) {
      return rows[0];
    }
    return false;
  }

  async findUserByEmail(email) {
    const query = `SELECT * FROM ${this.table} WHERE email='${email}';`;
    const [rows] = await this.connectToDB(query);
    return rows;
  }

  async deleteUser(id) {
    const query = `DELETE FROM ${this.table} WHERE id=${id};`
    const [rows] = await this.connectToDB(query);
    return;
  }
  async register(obj) {
    const keysInsert = [];
    const valuesInsert = [];
    for(let key in obj) {
      if(key !== 'id') {
        keysInsert.push(key);
        valuesInsert.push(`"${obj[key]}"`);
      }
    }

    const query = `INSERT ${this.table} (${keysInsert}) VALUES (${valuesInsert});`
    
    try {
      await this.connectToDB(query);
      const newUser = await this.checkValue(obj);
      return newUser;
    } catch (error) {
      console.log("Error!", error);
    }
      return false;
  }

  async checkValue(obj) {
    const data = [];
    for(let key in obj) {
        data.push(`${key}='${obj[key]}'`);
    }
    const query = `SELECT * FROM ${this.table} WHERE ${data.join(" AND ")};`;
    const [rows, fields] = await this.connectToDB(query);
    return rows;
  }
  
  async checkLogin(obj) {
    const data = [];
    for(let key in obj) {
        data.push(`${key}='${obj[key]}'`);
    }
    const query = `SELECT * FROM ${this.table} WHERE login='${obj.login}';`;
    const [rows] = await this.connectToDB(query);
    return rows;
  }

  async getAllUsers(role) {
    const query = `SELECT * FROM ${this.table} WHERE role='${role}';`;
    const [rows] = await this.connectToDB(query);
    return rows;
  }

  async resetPassword(id, password) {
    const query = `UPDATE ${this.table} SET password='${password}' WHERE id=${id};`;
    const [rows] = await this.connectToDB(query);
    return;
  }

}

module.exports = Model;