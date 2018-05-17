const Sequelize = require('sequelize');

// elephant
const sequelize = new Sequelize('postgres://awqrkrge:4o37TRLGwUkelhWov_IZ7HUpMZRAPy_b@pellefant.db.elephantsql.com:5432/awqrkrge');

// AWS RDS endpoint
//const sequelize = new Sequelize('postgres://[username]:[password]@todo-db.cpkch7wue0e9.us-west-2.rds.amazonaws.com:5432/todo_db');

const todo = require('./models/todo')(sequelize, Sequelize);

const db = {
    Sequelize,
    sequelize,
    todo
};

db.sequelize.sync();

module.exports = db;