const Model = require('../models/model');

class User extends Model {
    data = [];
    constructor() {
        super('users');
    }
}


module.exports = User;
