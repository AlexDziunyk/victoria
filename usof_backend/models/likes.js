const mysql = require('mysql2');
const db = require('../db/config.json');

class Likes {
  connection;
  constructor() {
    this.table = 'likes';
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

  async getAllPostLikesById(id) {
    const query = `SELECT * FROM ${this.table} WHERE post_id=${id} AND type="like";`;
    const [rows] = await this.connectToDB(query);
    return rows;
  }

  async getAllPostDislikesById(id) {
    const query = `SELECT * FROM ${this.table} WHERE post_id=${id} AND type="dislike";`;
    const [rows] = await this.connectToDB(query);
    return rows;
  }

  async getAllCommentLikesById(comment_id) {
    const query = `SELECT * FROM ${this.table} WHERE comment_id=${comment_id} AND type="like";`;
    const [rows] = await this.connectToDB(query);
    return rows;
  }

  async getAllCommentDislikesById(comment_id) {
    const query = `SELECT * FROM ${this.table} WHERE comment_id=${comment_id} AND type="dislike";`;
    const [rows] = await this.connectToDB(query);
    return rows;
  }

  async getRating(obj) {
    if(obj.post_id) {
      const query = `SELECT * FROM ${this.table} WHERE author="${obj.author}" AND post_id=${obj.post_id} AND type="${obj.type}";`;
      const [rows] = await this.connectToDB(query);
      if(rows.length > 0) {
        console.log("GETLIKE!", obj)
        return true;
      }
    } else {
      const query = `SELECT * FROM ${this.table} WHERE author="${obj.author}" AND comment_id=${obj.comment_id} AND type="${obj.type}";`;
      const [rows] = await this.connectToDB(query);
      if(rows.length > 0) {
        return true;
      }
    }
    return false;
  }

  // async getDislike(obj) {
  //   const keysInsert = [];
  //   const valuesInsert = [];
  //   for(let key in obj) {
  //     if(key !== 'id') {
  //       keysInsert.push(key);
  //       valuesInsert.push(`"${obj[key]}"`);
  //     }
  //   }
  //   const query = `SELECT * FROM ${this.table} (${keysInsert}) VALUES (${valuesInsert});`
  //   const [rows] = await this.connectToDB(query);
  //   if(rows.length > 0) {
  //     return true;
  //   }
  //   return false;
  // }

  async deleteRating(obj) {

    const isRated = await this.getRating(obj);

    if(isRated) {
      if(obj.post_id) {
        const queryDel = `DELETE FROM ${this.table} WHERE author="${obj.author}" AND post_id="${obj.post_id}" AND type="${obj.type}";`
        const [rows] = await this.connectToDB(queryDel);
      } else {
        const queryDel = `DELETE FROM ${this.table} WHERE author="${obj.author}" AND comment_id="${obj.comment_id}" AND type="${obj.type}";`
        const [rows] = await this.connectToDB(queryDel);
      }
    }
    return false;

  }

  // async deleteDislike(obj) {
  //   const keysInsert = [];
  //   const valuesInsert = [];
  //   for(let key in obj) {
  //     if(key !== 'id') {
  //       keysInsert.push(key);
  //       valuesInsert.push(`"${obj[key]}"`);
  //     }
  //   }
  //   const querySelect = `SELECT * FROM ${this.table} (${keysInsert}) VALUES (${valuesInsert});`
  //   const [rows] = await this.connectToDB(querySelect);
  //   if(rows.length > 0) {
  //     if(obj.post_id) {
  //       const queryDel = `DELETE FROM ${this.table} WHERE author="${obj.author}" AND post_id="${obj.post_id}" AND type="dislike";`
  //       const [rows] = await this.connectToDB(queryDel);
  //     } else {
  //       const queryDel = `DELETE FROM ${this.table} WHERE author="${obj.author}" AND comment_id="${comment_id}" AND type="dislike";`
  //       const [rows] = await this.connectToDB(queryDel);
  //     }
  //   }
  //   return false;
  // }

  async changeRating(obj) {
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

  // async dislike(obj) {
  //   const keysInsert = [];
  //   const valuesInsert = [];
  //   for(let key in obj) {
  //     if(key !== 'id') {
  //       keysInsert.push(key);
  //       valuesInsert.push(`"${obj[key]}"`);
  //     }
  //   }
  //   const query = `INSERT ${this.table} (${keysInsert}) VALUES (${valuesInsert});`
  //   const [rows] = await this.connectToDB(query);
  //   return rows;
  // }


}

module.exports = Likes;