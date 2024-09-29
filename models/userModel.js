const mysql = require('mysql');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

const User = {
    getAll: (callback) => {
        db.query('SELECT id, name, email, phone FROM users', callback);
    },

    getById: (id, callback) => {
        db.query('SELECT id, name, email, phone FROM users WHERE id = ?', [id], callback);
    },

    create: async (userData, callback) => {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
        db.query('INSERT INTO users SET ?', userData, callback);
    },

    update: (id, userData, callback) => {
        db.query('UPDATE users SET ? WHERE id = ?', [userData, id], callback);
    },

    delete: (id, callback) => {
        db.query('DELETE FROM users WHERE id = ?', [id], callback);
    },

    findByEmail: (email, callback) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], callback);
    }
};

module.exports = User;
